import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Copy, LoaderCircle, Mail, PencilLine } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Button, ButtonAnchor, buttonStyles } from '@/components/ui/Button';
import { EASE_SOFT } from '@/components/ui/Reveal';
import { copyText } from '@/lib/clipboard';
import { cn } from '@/lib/cn';
import { buildMailtoUrl, buildWhatsAppUrl, isWhatsAppConfigured } from '@/lib/whatsapp';
import { quoteService } from '@/services/quote.service';
import { FormField, fieldAria, inputClass } from './FormField';
import { quoteSchema, roomOptions, serviceOptions, todayIso, type QuoteFormValues } from './quoteSchema';

export interface QuoteDefaults {
  service?: string;
  room?: string;
  description?: string;
}

interface QuoteFormProps {
  defaults?: QuoteDefaults;
  /** Nivel del título del formulario según la página. */
  headingLevel?: 'h2' | 'h3';
}

const selectClass = cn(inputClass, 'h-12 cursor-pointer appearance-none pr-11');

export function QuoteForm({ defaults, headingLevel: Heading = 'h3' }: QuoteFormProps) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [message, setMessage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      service: defaults?.service ?? '',
      room: defaults?.room ?? '',
      description: defaults?.description ?? '',
      budget: '',
      city: '',
      estimatedDate: '',
      consent: false,
    },
  });

  const onSubmit = async ({ consent: _consent, budget, estimatedDate, ...values }: QuoteFormValues) => {
    // Breve pausa para mostrar el estado de preparación; no hay envío a ningún servidor.
    await new Promise((resolve) => setTimeout(resolve, 450));
    setCopyStatus('idle');
    setMessage(
      quoteService.buildMessage({
        ...values,
        budget: budget || undefined,
        estimatedDate: estimatedDate || undefined,
      }),
    );
  };

  const copyMessage = async () => {
    if (!message) return;
    const copied = await copyText(message);
    setCopyStatus(copied ? 'copied' : 'failed');
    if (copied) setTimeout(() => setCopyStatus('idle'), 2500);
  };
  const copied = copyStatus === 'copied';

  const whatsappUrl = message ? buildWhatsAppUrl(message) : null;
  const mailtoUrl = message ? buildMailtoUrl('Solicitud de cotización — Ksa Estilo', message) : null;

  return (
    <div className="rounded-3xl border border-line bg-ivory p-6 shadow-[0_30px_80px_-50px_rgb(34_34_34/0.35)] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {message ? (
          <motion.div
            key="result"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_SOFT }}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-olive text-ivory">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <Heading className="mt-6 text-title">Tu mensaje está listo</Heading>
            <p className="mt-3 max-w-prose text-muted">
              {isWhatsAppConfigured
                ? 'Revisa el resumen y ábrelo en WhatsApp para enviarlo. Tus datos solo se comparten cuando tú envías el mensaje.'
                : 'El WhatsApp de Ksa Estilo todavía no está configurado. Copia el mensaje para enviarlo por el canal que prefieras.'}
            </p>

            <pre className="mt-6 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-linen p-5 font-sans text-[0.875rem] leading-relaxed text-charcoal">
              {message}
            </pre>

            <div className="mt-6 flex flex-wrap gap-3">
              {whatsappUrl && (
                <ButtonAnchor href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="lg">
                  <WhatsAppIcon className="size-5" /> Abrir WhatsApp
                </ButtonAnchor>
              )}
              <Button variant={whatsappUrl ? 'outline' : 'primary'} size="lg" onClick={copyMessage}>
                {copied ? <Check className="size-4.5" aria-hidden="true" /> : <Copy className="size-4.5" aria-hidden="true" />}
                {copied ? 'Mensaje copiado' : 'Copiar mensaje'}
              </Button>
              {!whatsappUrl && mailtoUrl && (
                <ButtonAnchor href={mailtoUrl} variant="outline" size="lg">
                  <Mail className="size-4.5" aria-hidden="true" /> Enviar por correo
                </ButtonAnchor>
              )}
            </div>
            {copyStatus === 'failed' && (
              <p className="mt-4 text-[0.875rem] font-medium text-danger">
                No se pudo copiar automáticamente. Selecciona el texto del mensaje y cópialo manualmente.
              </p>
            )}
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-walnut-deep underline-offset-4 hover:underline"
            >
              <PencilLine className="size-4" aria-hidden="true" /> Editar solicitud
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_SOFT }}
            aria-labelledby={fid('title')}
          >
            <Heading id={fid('title')} className="text-title">
              Solicitud de cotización
            </Heading>
            <p className="mt-2 text-[0.9375rem] text-muted">Los campos marcados como opcionales pueden quedar vacíos.</p>

            <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <FormField id={fid('name')} label="Nombre completo" error={errors.fullName?.message} className="sm:col-span-2">
                <input
                  {...register('fullName')}
                  {...fieldAria(fid('name'), errors.fullName?.message)}
                  type="text"
                  autoComplete="name"
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>

              <FormField id={fid('phone')} label="Teléfono" error={errors.phone?.message}>
                <input
                  {...register('phone')}
                  {...fieldAria(fid('phone'), errors.phone?.message)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Ej.: 9XX XXX XXX"
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>

              <FormField id={fid('email')} label="Correo electrónico" error={errors.email?.message}>
                <input
                  {...register('email')}
                  {...fieldAria(fid('email'), errors.email?.message)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="nombre@correo.com"
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>

              <FormField id={fid('service')} label="Tipo de servicio" error={errors.service?.message}>
                <div className="relative">
                  <select {...register('service')} {...fieldAria(fid('service'), errors.service?.message)} className={selectClass}>
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                </div>
              </FormField>

              <FormField id={fid('room')} label="Tipo de ambiente" error={errors.room?.message}>
                <div className="relative">
                  <select {...register('room')} {...fieldAria(fid('room'), errors.room?.message)} className={selectClass}>
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {roomOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                </div>
              </FormField>

              <FormField
                id={fid('description')}
                label="Descripción del proyecto"
                error={errors.description?.message}
                hint="Medidas aproximadas, estilo que te gusta, materiales o cualquier detalle útil."
                className="sm:col-span-2"
              >
                <textarea
                  {...register('description')}
                  {...fieldAria(fid('description'), errors.description?.message, 'hint')}
                  rows={5}
                  className={cn(inputClass, 'min-h-32 resize-y py-3 leading-relaxed')}
                />
              </FormField>

              <FormField id={fid('city')} label="Ciudad" error={errors.city?.message}>
                <input
                  {...register('city')}
                  {...fieldAria(fid('city'), errors.city?.message)}
                  type="text"
                  autoComplete="address-level2"
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>

              <FormField id={fid('budget')} label="Presupuesto aproximado" optional error={errors.budget?.message}>
                <input
                  {...register('budget')}
                  {...fieldAria(fid('budget'), errors.budget?.message)}
                  type="text"
                  placeholder="Ej.: S/ 5 000"
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>

              <FormField id={fid('date')} label="Fecha estimada" optional error={errors.estimatedDate?.message}>
                <input
                  {...register('estimatedDate')}
                  {...fieldAria(fid('date'), errors.estimatedDate?.message)}
                  type="date"
                  min={todayIso()}
                  className={cn(inputClass, 'h-12')}
                />
              </FormField>
            </div>

            <div className="mt-7">
              <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-muted">
                <input
                  {...register('consent')}
                  {...fieldAria(fid('consent'), errors.consent?.message)}
                  type="checkbox"
                  className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-walnut"
                />
                <span>
                  Autorizo el uso de mis datos para atender esta solicitud, según la{' '}
                  <Link to="/privacidad" className="font-semibold text-charcoal underline underline-offset-4">
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>
              {errors.consent?.message && (
                <p id={`${fid('consent')}-error`} role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-danger">
                  {errors.consent.message}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[0.8125rem] leading-relaxed text-muted">
                Este sitio no guarda tus datos: solo los usa para preparar el mensaje que tú decides enviar.
              </p>
              <button type="submit" disabled={isSubmitting} className={buttonStyles('primary', 'lg', 'w-full sm:w-auto')}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4.5 animate-spin" aria-hidden="true" /> Preparando mensaje…
                  </>
                ) : isWhatsAppConfigured ? (
                  <>
                    <WhatsAppIcon className="size-4.5" /> Preparar mensaje de WhatsApp
                  </>
                ) : (
                  'Preparar solicitud'
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
