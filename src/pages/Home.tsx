// first page any new vistor to the site sees with sections: hero, fetaures, how it works, call to action

import { Link } from "react-router-dom";

// link buttons shared classes
const primaryLinkClasses = 'inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 font-semibold text-ink transition hover:bg-accent';

const secondaryLinkClasses = 'inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-white px-6 font-semibold text-ink transition hover:bg-gray-100';

// features section card
const FEATURES = [
  {
    icon: '🗓️',
    title: 'Plan every day',
    text: 'Turn "30 Reels in 30 Days" from a big idea into a day-by-day plan. No more waking up wondering what to post',
  },

  {
    icon: '⌛️' ,
    title: 'Track every stage',
    text: 'Move each post from idea to draft, writing, filming, editing, scheduled, or posted. Nothing gets lost in your notes app again.'
  },

   {
    icon: '🔥',
    title: 'Keep your streak going',
    text: 'Hit your goal for the day and watch it turn green. Your progress shows up, so you keep showing up.',
  },
];

const STEPS = [
   {
   
    title: 'Create a challenge',
    text: 'Pick the length of your challenge, your start date and how many posts per day. You set the pace.',
  },
  {
   
    title: 'Plan your content',
    text: 'Add a title, platform, hooks and caption or script to each day',
  },
  {
   
    title: 'Post it and own it',
    text: 'Mark posts as posted and watch your reach your goals. Let your growth speak for itself.',
  },
];

// preview grid 
const PREVIEW_DAYS = Array.from({ length: 15 }, (_, index) => index + 1)

function getPreviewTileClasses(day: number): string {
  if (day < 10) return 'border-green-500 bg-green-50 text-green-800';
  if (day === 10) return 'border-brand bg-brand-light text-ink ring-2 ring-brand-light';
  return 'border-gray-200 bg-white text-gray-500';
}

function Home() {
  return (
    <div className="max-auto flex w-full max-w-6xl flex-col gap-20">

    {/* hero section  */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-brand-dark">Consistency looks good on you</p>

          <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl">Stop starting over. This time, you finish!</h1>

          <p className="max-w-xl text-lg text-gray-700 font-medium">30Days helps creators and small businesses plan a post for every day, move eahc one from idea to posted, and keep their streak alive, all in one place.</p>

          {/* buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className={primaryLinkClasses}>Start My 30 Days</Link>

            <Link to="/login" className={secondaryLinkClasses}>Log in</Link>
          </div>
        </div>

        {/*  previw card */}
        <div aria-hidden="true" className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-bold text-ink">30 Reels in 30 Days</p>
            <p className="text-sm font-semibol text-brand-dark">🔥9 Days Consistent</p>
          </div>
        </div>
        {/* progress bar  */}

        <div className="mb-5 h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[3-%] rounded-full bg-linear-to-r from-brand to-accent" />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {PREVIEW_DAYS.map((day) => (
            <div
              key={day}
              className={`flex aspect-square items-center justify-center rounded-xl border-2 text-sm font-bold ${getPreviewTileClasses(day)}`}
            >
              {day}
            </div>
          ))}
        </div>
      </section>

      {/*  FEATURES */}

      <section aria-labelledby="features-heading" className="flex flex-col gap-8">
        <h2 id="features-heading" className="text-center text-3xl font-extrabold text-ink">
          Built for creators who are done falling off
        </h2>

        <div>
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm">
              <span aria-hidden="true" className="text-3xl">{feature.icon}</span>
              <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
              <p className="text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section aria-labelledby="steps-heading" className="flex flex-col gap-8">
        <h2 id="steps-heading" className="text-center text-3xl font-extrabold text-ink">How it works</h2>

        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm"> 
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-extrabold text-ink">
                {index + 1}
              </span>

              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="text-gray-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* call to action */}
      <section className="flex flex-col items-center gap-5 rounded-3xl bg-linear-to-r from-brand to-accent px-6 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-ink">
          Your 30 days starts today.
        </h2>

        <p className="max-w-lg text-ink">
          Give yourself one month of hsowing up intentionally and consistently. Your future audience is waiting.
        </p>

        <Link
          to="/register"
          className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold text-white transition hover:bg-gray-800"
        >
          Let's go
        </Link>
      </section>
    </div>
  )
}

export default Home;