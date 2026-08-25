"use server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type ContactField = "name" | "company" | "email" | "phone" | "profile" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "invalid" | "error" | "unconfigured";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Ressaisie : on rend les valeurs pour ne pas vider le formulaire en cas d'erreur. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactFormState = { status: "idle" };

/** Le formulaire est court : une validation maison suffit, sans dépendance. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readField(formData: FormData, field: ContactField): string {
  const raw = formData.get(field);
  return typeof raw === "string" ? raw.trim() : "";
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Pot de miel : rempli uniquement par les robots, qui ne voient pas le `display: none`.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { status: "success" };
  }

  const values: Record<ContactField, string> = {
    name: readField(formData, "name"),
    company: readField(formData, "company"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    profile: readField(formData, "profile"),
    message: readField(formData, "message"),
  };

  const errors: Partial<Record<ContactField, string>> = {};

  if (values.name.length < 2) {
    errors.name = "Merci d’indiquer votre nom.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Merci d’indiquer une adresse e-mail valide.";
  }
  if (values.message.length < 10) {
    errors.message = "Merci de décrire votre projet en quelques mots.";
  }
  if (values.message.length > 4000) {
    errors.message = "Votre message dépasse 4 000 caractères.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // Tant que la clé n'est pas renseignée, l'interface bascule sur le lien e-mail.
    return {
      status: "unconfigured",
      message: "L’envoi du formulaire n’est pas encore activé.",
      values,
    };
  }

  const profile = values.profile || "Non précisé";

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `AMABAY PLACE — nouvelle demande (${profile})`,
        from_name: "Site AMABAY PLACE",
        replyto: values.email,
        Nom: values.name,
        Société: values.company || "Non précisé",
        "E-mail": values.email,
        Téléphone: values.phone || "Non précisé",
        Profil: profile,
        Message: values.message,
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !result.success) {
      return {
        status: "error",
        message: "L’envoi a échoué. Merci de réessayer ou de nous écrire directement.",
        values,
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "L’envoi a échoué. Merci de réessayer ou de nous écrire directement.",
      values,
    };
  }
}
