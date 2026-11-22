"use client";

import Image from "next/image";
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUp, Bath, ChevronDown, CircleHelp,
  ClipboardList, Copy, Globe2, HeartHandshake, MessageCircle, MessagesSquare, Repeat2,
  ShieldCheck, Soup, Trash2, UserRound, UsersRound, X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  CHAT_LIMITS, type AdvisorResponse, type AnswerStyle, type ChatError,
  type Intent, type Locale, type UserProfile,
} from "@/lib/ai/contracts";
import { dictionary, fieldIds, languages, roles, storyIds, type Translation } from "./copy";
import { prepareRequest, type Turn } from "./conversation";
import { emptyFacts, exampleFacts, formatSummary, summaryRows, type Facts } from "./summary";

const roleIcons = { novice_caregiver: HeartHandshake, experienced_caregiver: UserRound, family: UsersRound };
const topicIcons = [Repeat2, Bath, MessageCircle, Soup, ClipboardList, CircleHelp];
const dateOptions = { hour: "2-digit", minute: "2-digit" } as const;

function Brand() {
  return <span className="brand"><span className="brand-mark"><HeartHandshake size={22} /></span>CareBridge</span>;
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return <div className="answer-section"><h4>{title}</h4><ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul></div>;
}

function Reply({ response, onCopy }: { response: AdvisorResponse; onCopy: (text: string) => void }) {
  const t = dictionary[response.locale];
  const help = response.seekHelp && (
    <div className="help-note"><ShieldCheck size={20} /><div><h4>{t.help}</h4><p>{response.seekHelp}</p></div></div>
  );
  return (
    <article className="reply" lang={response.locale}>
      <h3><span className="reply-icon"><HeartHandshake size={18} /></span>{t.advisor}</h3>
      {response.modelInfo.provenance === "deterministic-rule" && <p className="quiet rule-source">{t.ruleNotice}</p>}
      {response.kind === "escalation" && help}
      {response.understanding && <div className="answer-section"><h4>{t.understanding}</h4><p>{response.understanding}</p></div>}
      <List title={t.questions} items={response.questions} />
      <List title={t.actions} items={response.actions} />
      {response.phrase && (
        <div className="phrase-card">
          <div className="phrase-heading">
            <h4>{t.phrase}</h4>
            <button className="text-action" type="button" onClick={() => onCopy(response.phrase!.primary)}><Copy size={16} />{t.copy}</button>
          </div>
          <blockquote>{response.phrase.primary}</blockquote>
          {response.phrase.zhTwReference && response.locale !== "zh-TW" && (
            <p className="reference">{t.reference}<span lang="zh-TW">{response.phrase.zhTwReference}</span></p>
          )}
        </div>
      )}
      <List title={t.observe} items={response.observe} />
      {response.kind !== "escalation" && help}
      <List title={t.limitations} items={response.limitations} />
    </article>
  );
}

function Summary({ t, facts, checked, onEdit, onCheck, onCopy }: {
  t: Translation;
  facts: Facts;
  checked: boolean;
  onEdit: (next: Facts) => void;
  onCheck: (value: boolean) => void;
  onCopy: (text: string) => void;
}) {
  const hasFacts = Object.values(facts).some((value) => value.trim());
  return (
    <section className="summary-view" aria-labelledby="summary-title">
      <div className="section-heading">
        <div><h2 id="summary-title">{t.summary}</h2><p>{t.summaryIntro}</p></div>
        <button className="outline-action" type="button" onClick={() => onEdit({ ...exampleFacts })}><ClipboardList size={17} />{t.example}</button>
      </div>
      <div className="summary-grid">
        <div className="surface fact-form">
          {fieldIds.map((field) => (
            <label key={field}>{t.fields[field][0]}
              <textarea maxLength={1000} rows={2} value={facts[field]} placeholder={t.fields[field][1]}
                onChange={(event) => onEdit({ ...facts, [field]: event.currentTarget.value })} />
            </label>
          ))}
        </div>
        <div className="surface preview">
          <h3>{t.preview}</h3>
          <p className="quiet">{t.sourceLanguage}</p>
          <dl lang="zh-TW">
            {summaryRows(facts).map(({ key, heading, text }) => (
              <div key={key}><dt>{heading}</dt><dd>{text}</dd></div>
            ))}
          </dl>
          <label className="checkbox">
            <input type="checkbox" checked={checked} disabled={!hasFacts} onChange={(event) => onCheck(event.currentTarget.checked)} />
            <span>{t.confirm}</span>
          </label>
          <button className="primary" type="button" disabled={!checked} onClick={() => onCopy(formatSummary(facts))}>
            <Copy size={17} />{t.copySummary}
          </button>
        </div>
      </div>
    </section>
  );
}

export function CareBridge() {
  const [locale, setLocale] = useState<Locale>("zh-TW");
  const [profile, setProfile] = useState<UserProfile>("novice_caregiver");
  const [style, setStyle] = useState<AnswerStyle | null>(null);
  const answerStyle = style ?? (profile === "experienced_caregiver" ? "brief" : "detailed");
  const [mode, setMode] = useState<"chat" | "summary">("chat");
  const [draft, setDraft] = useState("");
  const [scenarioId, setScenarioId] = useState<(typeof storyIds)[number]>();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState("");
  const [failed, setFailed] = useState<{ code: string; question: string; intent: Intent }>();
  const [feedback, setFeedback] = useState("");
  const [facts, setFacts] = useState(emptyFacts);
  const [checked, setChecked] = useState(false);
  const [dialog, setDialog] = useState<"privacy" | "export" | "clear">("privacy");
  const busy = useRef(false);
  const modal = useRef<HTMLDialogElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const latestReply = useRef<HTMLDivElement>(null);
  const scrollToReply = useRef(false);
  const t = dictionary[locale];

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  useEffect(() => {
    if (scrollToReply.current && mode === "chat") {
      latestReply.current?.scrollIntoView({ block: "nearest" });
      scrollToReply.current = false;
    }
  }, [turns, mode]);

  function chooseMode(next: "chat" | "summary") {
    setMode(next);
    setFeedback("");
    requestAnimationFrame(() => {
      const workspace = document.getElementById("workspace");
      workspace?.focus({ preventScroll: true });
      workspace?.scrollIntoView({ block: "start" });
    });
  }

  function showDialog(next: typeof dialog) {
    setDialog(next);
    modal.current?.showModal();
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(t.copied);
    } catch {
      setFeedback(t.copyError);
    }
  }

  async function ask(question: string, intent: Intent = "guidance") {
    const content = question.trim();
    if (!content || busy.current) return;
    busy.current = true;
    setPending(content);
    setFailed(undefined);
    setFeedback("");
    const request: Turn["request"] = { profile, locale, style: answerStyle, intent, scenarioId };
    const askedAt = new Date().toISOString();

    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prepareRequest(request, content, turns)),
      });
      const body: AdvisorResponse | ChatError = await result.json();
      if (!result.ok || "error" in body) {
        setFailed({ code: "error" in body ? body.error.code : "UNKNOWN", question: content, intent });
        return;
      }
      scrollToReply.current = true;
      setTurns((previous) => [...previous, { question: content, request, response: body, askedAt, answeredAt: new Date().toISOString() }]);
      if (intent === "guidance") {
        setDraft("");
        setScenarioId(undefined);
      }
    } catch {
      setFailed({ code: "NETWORK", question: content, intent });
    } finally {
      busy.current = false;
      setPending("");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  function download() {
    const file = new Blob([JSON.stringify({
      format: "carebridge.conversation.v1",
      exportedAt: new Date().toISOString(),
      turns,
    }, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = href;
    link.download = "carebridge-conversation.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    setFeedback(t.downloaded);
    modal.current?.close();
  }

  function clearChat() {
    setTurns([]);
    setDraft("");
    setFailed(undefined);
    setFeedback("");
    setScenarioId(undefined);
    modal.current?.close();
    composer.current?.focus();
  }

  const links: ReactNode = (
    <>
      <button type="button" aria-current={mode === "chat" ? "page" : undefined} onClick={() => chooseMode("chat")}>{t.chat}</button>
      <button type="button" aria-current={mode === "summary" ? "page" : undefined} onClick={() => chooseMode("summary")}>{t.summary}</button>
    </>
  );
  const showHero = mode === "chat" && turns.length === 0;

  return (
    <>
      <a className="skip" href="#workspace">{t.skip}</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="home-link" href="#" onClick={() => setMode("chat")} aria-label="CareBridge"><Brand /></a>
          <nav aria-label="CareBridge">{links}</nav>
          <label className="language">
            <Globe2 size={17} /><span className="sr-only">{t.language}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
              {languages.map(({ id, name }) => <option key={id} value={id} lang={id}>{name}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </header>

      <main className="container">
        {showHero && <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">{t.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
            <p>{t.intro}</p>
            <a className="primary" href="#workspace">{t.start}<ArrowDown size={17} /></a>
          </div>
          <div className="hero-photo">
            <Image src="/care-at-home.webp" fill priority alt={t.imageAlt} sizes="(max-width: 760px) 100vw, 580px" />
          </div>
        </section>}

        <div className="workspace" id="workspace" tabIndex={-1}>
          {!showHero && <h1 className="sr-only">CareBridge</h1>}
          {mode === "summary" ? (
            <Summary t={t} facts={facts} checked={checked}
              onEdit={(next) => { setFacts(next); setChecked(false); setFeedback(""); }}
              onCheck={setChecked} onCopy={copyText} />
          ) : (
            <div className="chat-grid">
              <aside className="surface preferences" aria-labelledby="preferences">
                <h2 id="preferences">{t.preferences}</h2>
                <fieldset className="role-picker">
                  <legend>{t.role}</legend>
                  {roles.map((role) => {
                    const Icon = roleIcons[role];
                    const [name, description] = t.roles[role];
                    return (
                      <label className="role" key={role}>
                        <input type="radio" name="role" value={role} checked={profile === role}
                          onChange={() => { setProfile(role); setStyle(null); }} />
                        <span className="role-card"><Icon size={19} /><span><strong>{name}</strong><small>{description}</small></span></span>
                      </label>
                    );
                  })}
                </fieldset>
                <fieldset>
                  <legend>{t.length}</legend>
                  <div className="length-options">
                    {(["brief", "detailed"] as const).map((choice) => (
                      <label key={choice}>
                        <input type="radio" name="length" checked={choice === answerStyle} onChange={() => setStyle(choice)} />
                        <span>{t[choice]}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </aside>

              <section className="surface chat-panel" aria-labelledby="chat-title">
                <div className="chat-heading">
                  <h2 id="chat-title"><MessagesSquare size={23} />{t.chat}</h2>
                  <div className="chat-actions">
                    <button type="button" className="text-action" disabled={!turns.length || !!pending} onClick={() => showDialog("export")}><ArrowDownToLine size={16} />{t.export}</button>
                    <button type="button" className="text-action" disabled={!(turns.length || draft || failed) || !!pending} onClick={() => showDialog("clear")}><Trash2 size={16} />{t.clear}</button>
                  </div>
                </div>

                {!turns.length && !pending && (
                  <div className="topics">
                    <h3>{t.topics}</h3>
                    <p className="quiet">{t.topicHint}</p>
                    <div className="topic-options">
                      {storyIds.map((id, index) => {
                        const Icon = topicIcons[index];
                        return <button type="button" key={id} onClick={() => {
                          setDraft(t.stories[id][1]); setScenarioId(id); setFailed(undefined); composer.current?.focus();
                        }}><Icon size={17} />{t.stories[id][0]}</button>;
                      })}
                    </div>
                  </div>
                )}

                {!!turns.length && (
                  <div className="thread">
                    {turns.map((turn, index) => (
                      <div ref={index === turns.length - 1 ? latestReply : undefined} className="turn" key={index}>
                        <div className="question" lang={turn.request.locale}>
                          <p className="message-label">{dictionary[turn.request.locale].you} <time dateTime={turn.askedAt}>{new Intl.DateTimeFormat(locale, dateOptions).format(new Date(turn.askedAt))}</time></p>
                          <p>{turn.question}</p>
                        </div>
                        <Reply response={turn.response} onCopy={copyText} />
                      </div>
                    ))}
                  </div>
                )}

                <form className="composer" onSubmit={submit}>
                  <div role="status" aria-atomic="true">
                    {pending && <p className="working">{t.working}</p>}
                    {!pending && !failed && turns.length > 0 && <span className="sr-only">{t.replyReady}</span>}
                  </div>
                  {failed && (
                    <div className="error-note">
                      <p id="chat-error" role="alert">{t.errors[failed.code] ?? t.errors.UNKNOWN}</p>
                      <button className="outline-action" type="button" onClick={() => void ask(failed.question, failed.intent)}>{t.retry}</button>
                    </div>
                  )}
                  <label htmlFor="care-message">{turns.length ? t.followUp : t.composer}</label>
                  <div className="composer-input">
                    <textarea ref={composer} id="care-message" placeholder={t.placeholder} value={draft} rows={3}
                      maxLength={CHAT_LIMITS.messageChars} readOnly={!!pending} aria-describedby={failed ? "chat-error chat-privacy" : "chat-privacy"}
                      onChange={(event) => { setDraft(event.target.value); setFailed(undefined); }} />
                    <div className="composer-actions">
                      <small>{draft.length} / {CHAT_LIMITS.messageChars}</small>
                      <button type="submit" className="primary" disabled={!draft.trim() || !!pending}>{t.send}<ArrowUp size={17} /></button>
                    </div>
                  </div>
                  <p id="chat-privacy" className="quiet composer-note">{t.privacyIntro} {t.privacyOpenAI}</p>
                  {locale !== "zh-TW" && <p className="quiet composer-note">{t.privacyReview}</p>}
                  {turns.length > 0 && (
                    <div className="follow-up-actions">
                      <button type="button" className="outline-action" disabled={!!pending} onClick={() => void ask(t.phraseRequest, "phrase")}><MessageCircle size={16} />{t.phrase}</button>
                      <button type="button" className="text-action" onClick={() => chooseMode("summary")}>{t.summary}<ArrowRight size={16} /></button>
                    </div>
                  )}
                  {turns.length > 0 && <p className="quiet composer-note">{t.limitNotice}</p>}
                </form>
              </section>
            </div>
          )}
          <div className="feedback" role="status">{feedback}</div>
        </div>

        <footer className="footer">
          <div><ShieldCheck size={20} /><p>{t.privacyMedical}</p></div>
          <button type="button" className="text-action" onClick={() => showDialog("privacy")}>{t.privacy}<ArrowRight size={16} /></button>
        </footer>
      </main>

      <dialog ref={modal} aria-labelledby="modal-title">
        <div className="modal-heading">
          <h2 id="modal-title">{dialog === "privacy" ? t.privacy : dialog === "clear" ? t.clear : t.export}</h2>
          <button className="icon-action" type="button" aria-label={t.cancel} onClick={() => modal.current?.close()}><X size={20} /></button>
        </div>
        {dialog === "privacy" ? (
          <div className="modal-body">
            <p>{t.privacyIntro}</p><p>{t.privacyOpenAI}</p><p>{t.privacyStorage}</p><p>{t.privacyReview}</p><p>{t.privacyMedical}</p>
          </div>
        ) : (
          <div className="modal-body">
            <p>{dialog === "clear" ? t.clearWarning : t.exportWarning}</p>
            <div className="modal-actions">
              <button className="outline-action" type="button" onClick={() => modal.current?.close()}>{t.cancel}</button>
              <button className="primary" type="button" onClick={dialog === "clear" ? clearChat : download}>{dialog === "clear" ? t.clear : t.download}</button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
