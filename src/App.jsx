import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'

const HeroCanvas = lazy(() => import('./components/HeroCanvas'))

const services = [
  {
    index: '01',
    title: 'Agentic systems',
    body: 'Autonomous agents that plan, tool-call, and complete multi-step work across your stack — with human checkpoints where it matters.',
  },
  {
    index: '02',
    title: 'AI product engineering',
    body: 'From prototype to production: RAG, evals, guardrails, and interfaces that make models useful for real operators.',
  },
  {
    index: '03',
    title: 'Workflow automation',
    body: 'Replace brittle scripts with intelligent pipelines — research, ops, support, and internal tools that run themselves.',
  },
  {
    index: '04',
    title: 'LLM applications',
    body: 'Custom copilots, knowledge systems, and conversational products tuned to your data, brand, and latency budget.',
  },
  {
    index: '05',
    title: 'ML engineering',
    body: 'Fine-tuning, retrieval, observability, and deployment so models stay accurate after they leave the notebook.',
  },
  {
    index: '06',
    title: 'Strategy & discovery',
    body: 'We map where agents create leverage, kill vanity use-cases, and ship a 90-day build plan you can fund.',
  },
]

const work = [
  {
    tag: 'Agentic ops',
    title: 'Himalayan logistics copilot',
    meta: 'Routing agents · 11 weeks',
    body: 'A fleet of agents that reads invoices, weather, and road closures, then proposes last-mile plans for a Nepal logistics network.',
  },
  {
    tag: 'Knowledge AI',
    title: 'Banking research desk',
    meta: 'RAG + evals · 8 weeks',
    body: 'Private retrieval over policy, KYC, and market notes — with citations, refusal rules, and an analyst-facing workspace.',
  },
  {
    tag: 'Product',
    title: 'Support swarm',
    meta: 'Multi-agent · 6 weeks',
    body: 'Triage, draft, and escalate tickets across Slack and email. Humans approve high-risk replies; the rest ships.',
  },
]

const steps = [
  { title: 'Discover', body: 'Map workflows, data, risk, and the jobs an agent should actually own.' },
  { title: 'Design', body: 'Architecture, tools, memory, and UX — including where a human stays in the loop.' },
  { title: 'Build', body: 'Ship a working system with evals, logging, and a thin UI your team can run.' },
  { title: 'Harden', body: 'Guardrails, latency, cost, and handover so it survives production, not just demo day.' },
]

export default function App() {
  const [sent, setSent] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div id="top" className="page">
      <Navbar />

      <section className="hero">
        <div className="hero__canvas">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow">Kathmandu, Nepal · AI & Agentic Development</p>
          <h1>
            Intelligence
            <br />
            that ships.
          </h1>
          <p className="lede">
            Blindpass builds AI products and autonomous agents for teams who need software that
            thinks, plans, and acts — designed in the Himalaya, deployed worldwide.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Start a project
            </a>
            <a className="btn btn--ghost" href="#work">
              View work
            </a>
          </div>
        </div>
        <div className="hero__meta">
          <span>27.7172° N, 85.3240° E</span>
          <span>Kathmandu Valley</span>
        </div>
      </section>

      <section className="strip">
        <p>Agents · RAG · Fine-tuning · Copilots · Eval harnesses · Production ML</p>
      </section>

      <section className="section about" id="studio">
        <div className="section__head">
          <p className="eyebrow">The studio</p>
          <h2>A Kathmandu studio for systems that act.</h2>
        </div>
        <div className="about__grid">
          <p className="about__lead">
            We are Blindpass — an AI development and agentic engineering studio based in Kathmandu.
            We design software that does not wait to be told every step. It reasons, uses tools, and
            closes the loop.
          </p>
          <div className="stats">
            <article>
              <strong>2026</strong>
              <span>Founded in Kathmandu</span>
            </article>
            <article>
              <strong>40+</strong>
              <span>Agent workflows shipped</span>
            </article>
            <article>
              <strong>12</strong>
              <span>Countries served</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2>Agents in the wild.</h2>
        </div>
        <div className="work">
          {work.map((item) => (
            <article className="work__card" key={item.title}>
              <p className="work__tag">{item.tag}</p>
              <h3>{item.title}</h3>
              <p className="work__meta">{item.meta}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <div className="section__head">
          <p className="eyebrow">Capabilities</p>
          <h2>What we build.</h2>
        </div>
        <div className="services">
          {services.map((item) => (
            <article className="service" key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="process">
        <div className="section__head">
          <p className="eyebrow">Process</p>
          <h2>From brief to autonomous.</h2>
        </div>
        <ol className="process">
          {steps.map((step, i) => (
            <li key={step.title}>
              <em>0{i + 1}</em>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section location">
        <div>
          <p className="eyebrow">Location</p>
          <h2>Built in Kathmandu. Shipped everywhere.</h2>
          <p>
            Our studio sits in the Kathmandu Valley — a timezone that overlaps Asia, Europe, and the
            US West Coast. We work with founders and operators who want production AI, not slide
            decks.
          </p>
          <ul className="location__facts">
            <li>Kathmandu, Nepal</li>
            <li>NPT (UTC+5:45)</li>
            <li>hello@blindpass.dev</li>
          </ul>
        </div>
        <div className="location__panel" aria-hidden="true">
          <p>Valley</p>
          <h3>27.7° N</h3>
          <p>Himalayan edge · Agent lab</p>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section__head">
          <p className="eyebrow">Contact</p>
          <h2>Tell us what should run itself.</h2>
        </div>
        {sent ? (
          <p className="contact__thanks">
            Received. We will reply from Kathmandu within one business day.
          </p>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" type="text" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@company.com" />
            </label>
            <label className="form__full">
              Project
              <textarea
                name="project"
                required
                rows={5}
                placeholder="What should an agent own? Data, tools, timeline."
              />
            </label>
            <button className="btn btn--primary" type="submit">
              Send brief
            </button>
          </form>
        )}
      </section>

      <footer className="footer">
        <p>Blindpass · Kathmandu, Nepal</p>
        <p>AI development & agentic systems</p>
      </footer>
    </div>
  )
}
