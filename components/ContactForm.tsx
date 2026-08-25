"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { initialContactState, submitContactForm } from "@/app/actions";
import { contactDetails } from "@/data/amabayContent";

const profiles = [
  "Enseigne / marque",
  "Restaurateur",
  "Opérateur de services",
  "Porteur de concept",
  "Autre",
] as const;

/** Lien de repli quand l'envoi n'est pas configuré ou qu'il échoue. */
function fallbackLink(subject: string, body: string) {
  if (!contactDetails.email) return null;
  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const id = useId();

  // Après un envoi réussi on vide les champs et on amène le focus sur le message
  // de confirmation, sinon rien ne signale l'issue aux lecteurs d'écran.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state.status]);

  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const field = (name: string) => `${id}-${name}`;

  const mailto = fallbackLink(
    "Demande — AMABAY PLACE",
    [
      `Nom : ${values.name ?? ""}`,
      `Société : ${values.company ?? ""}`,
      `Téléphone : ${values.phone ?? ""}`,
      "",
      values.message ?? "",
    ].join("\n"),
  );

  if (state.status === "success") {
    return (
      <div className="contact-form contact-form--sent">
        <p className="contact-form-status is-success" ref={statusRef} tabIndex={-1} role="status">
          Merci, votre message est parti.
        </p>
        <p>Nous revenons vers vous rapidement, en général sous deux jours ouvrés.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" action={formAction} ref={formRef} noValidate>
      <h3>Écrivez-nous</h3>
      <p className="contact-form-lead">
        Décrivez votre projet en quelques lignes : nous vous répondons avec les surfaces
        disponibles et les prochaines étapes.
      </p>

      {/* Pot de miel : invisible pour les visiteurs, rempli par les robots. */}
      <div className="contact-form-trap" aria-hidden="true">
        <label htmlFor={field("website")}>Ne pas remplir</label>
        <input id={field("website")} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor={field("name")}>
            Nom <span aria-hidden="true">*</span>
          </label>
          <input
            id={field("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? field("name-error") : undefined}
          />
          {errors.name && (
            <p className="contact-field-error" id={field("name-error")}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor={field("company")}>Société / enseigne</label>
          <input
            id={field("company")}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values.company}
          />
        </div>

        <div className="contact-field">
          <label htmlFor={field("email")}>
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id={field("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? field("email-error") : undefined}
          />
          {errors.email && (
            <p className="contact-field-error" id={field("email-error")}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor={field("phone")}>Téléphone</label>
          <input
            id={field("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
          />
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor={field("profile")}>Vous êtes</label>
          <select id={field("profile")} name="profile" defaultValue={values.profile ?? ""}>
            <option value="">Sélectionnez…</option>
            {profiles.map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor={field("message")}>
            Votre projet <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={field("message")}
            name="message"
            rows={5}
            required
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? field("message-error") : undefined}
          />
          {errors.message && (
            <p className="contact-field-error" id={field("message-error")}>
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form-footer">
        <button type="submit" disabled={pending}>
          {pending ? "Envoi en cours…" : "Envoyer"}
        </button>
        <p className="contact-form-required">* Champs obligatoires</p>
      </div>

      <p
        className={`contact-form-status ${state.status === "idle" ? "is-quiet" : "is-error"}`}
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        {state.status === "unconfigured" && (
          <>
            L’envoi automatique n’est pas encore activé.{" "}
            {mailto ? (
              <a href={mailto}>Écrivez-nous directement par e-mail</a>
            ) : (
              "Merci de nous joindre par téléphone."
            )}
          </>
        )}
        {state.status === "error" && (
          <>
            {state.message}{" "}
            {mailto && <a href={mailto}>Nous écrire par e-mail</a>}
          </>
        )}
        {state.status === "invalid" && "Merci de corriger les champs signalés."}
      </p>
    </form>
  );
}
