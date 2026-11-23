import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/ai/contracts";
import { dictionary, roles } from "./copy";
import { comparisonCapture, comparisonExamples } from "./role-comparison-data";

export function RoleComparison({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const { question, answers } = comparisonExamples[locale];
  const { date, modelInfo } = comparisonCapture;

  return (
    <section className="comparison" aria-labelledby="compare-title">
      <div className="comparison-intro">
        <h1 id="compare-title">{t.comparison.title}</h1>
        <p>{t.comparison.savedResults}</p>
      </div>
      <div className="comparison-scenario">
        <h2>{t.comparison.scenario}</h2>
        <p>{question}</p>
      </div>
      <div className="comparison-grid">
        {roles.map((role) => {
          const answer = answers[role];
          return (
            <article className="surface comparison-card" key={role} aria-labelledby={`compare-${role}`}>
              <header>
                <h2 id={`compare-${role}`}>{t.roles[role][0]}</h2>
                <p className="quiet">{t.roles[role][1]}</p>
              </header>
              <div className="phrase-card comparison-phrase">
                <h3>{t.phrase}</h3>
                <blockquote>{answer.phrase.primary}</blockquote>
              </div>
              <div className="comparison-actions">
                <h3>{t.actions}</h3>
                <ul>{answer.actions.map((action) => <li key={action}>{action}</li>)}</ul>
              </div>
              <details>
                <summary>{t.comparison.more}</summary>
                <div className="comparison-notes">
                  <div><h3>{t.understanding}</h3><p>{answer.understanding}</p></div>
                  {answer.phrase.zhTwReference && <div>
                    <h3>{t.reference}</h3>
                    <p lang="zh-TW">{answer.phrase.zhTwReference}</p>
                  </div>}
                  <div><h3>{t.limitations}</h3>{answer.limitations.map((item) => <p key={item}>{item}</p>)}</div>
                </div>
              </details>
              <Link className="outline-action comparison-link" href={`/try/${locale}/${role}`}
                target="_blank" rel="noopener noreferrer" prefetch={false}>
                {t.comparison.tryRole}<ExternalLink aria-hidden="true" size={16} />
              </Link>
            </article>
          );
        })}
      </div>
      <p className="quiet comparison-capture">
        <time dateTime={date}>{date}</time> · OpenAI {modelInfo.model} · {modelInfo.promptVersion}
      </p>
      {locale !== "zh-TW" && <p className="quiet">{t.privacyReview}</p>}
    </section>
  );
}
