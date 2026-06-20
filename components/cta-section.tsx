export function CtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 text-center sm:py-44"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          LET&apos;S MAKE
          <br />
          YOUR BRAND{' '}
          <span className="font-serif text-[1.08em] font-normal italic">
            grow.
          </span>
        </h2>
        <p className="mt-8 text-base text-muted-foreground sm:text-lg">
          Available for professional collaborations. Feel free to reach out anytime in any convenient way.
        </p>
        <a
          href="mailto:yanagitanaga@gmail.com"
          className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-85"
        >
          Get In Touch
        </a>
      </div>
    </section>
  )
}
