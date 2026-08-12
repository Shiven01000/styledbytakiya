export function Footer() {
  return (
    <footer className="bg-cream-deep px-gutter py-scene">
      <div className="flex flex-col gap-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-ui text-ui-sm tracking-ui text-ink-muted uppercase">
            Stay in touch with the studio
          </p>
          <form
            className="mt-5 flex max-w-sm items-center gap-4 rule-under pb-2"
            /* Wired up in Phase 6 alongside the booking mailer. */
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              className="min-h-11 w-full bg-transparent font-ui text-read text-ink outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              className="flex h-11 w-11 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-55"
            >
              <span className="sr-only">Subscribe</span>
              <span aria-hidden>&rarr;</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2 font-ui text-ui-sm tracking-ui text-ink-muted uppercase md:items-end">
          <span className="font-display text-d-md leading-none tracking-[0.14em] text-ink uppercase">
            Takiya
          </span>
          <span>Edmonton · every day, 6 till 11</span>
          <span>styledbytakiya.ca</span>
        </div>
      </div>
    </footer>
  );
}
