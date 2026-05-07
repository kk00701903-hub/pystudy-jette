import { useMemo, useState } from 'react'
import './App.css'

type Chapter = {
  id: string
  num: number
  emoji: string
  title: string
  desc: string
  tags: string[]
  items: string[]
}

const chapters: Chapter[] = [
  { id: 'ch01', num: 1, emoji: '🚀', title: '시작하기', desc: '파이썬 업무자동화 & AI 활용을 위한 개발환경 구축과 ChatGPT 시작하기', tags: ['Python', 'VSCode', 'ChatGPT'], items: ['업무자동화 개요', '개발환경 구축하기', 'ChatGPT 시작하기'] },
  { id: 'ch02', num: 2, emoji: '📁', title: '파일 정리하기', desc: '파이썬으로 PDF 생성 및 파일 분류 자동화를 배웁니다', tags: ['os', 'shutil', 'fpdf'], items: ['PDF 파일 생성하기', '파일 월별 정리하기'] },
  { id: 'ch03', num: 3, emoji: '📊', title: '파일 분석하기', desc: 'Pandas와 Matplotlib로 엑셀/데이터 분석 자동화를 진행합니다', tags: ['pandas', 'matplotlib'], items: ['월별 데이터 분석', '병합/집계', '시각화'] },
  { id: 'ch04', num: 4, emoji: '🌐', title: 'Streamlit 활용하기', desc: 'Streamlit으로 웹앱/대시보드를 빠르게 구현합니다', tags: ['Streamlit', '웹앱'], items: ['소개', '실행', '실습'] },
  { id: 'ch05', num: 5, emoji: '📝', title: '워드 다루기', desc: 'python-docx로 공문/문서 자동 생성을 실습합니다', tags: ['python-docx'], items: ['공문 자동 생성', '템플릿 치환'] },
  { id: 'ch06', num: 6, emoji: '🔍', title: 'PDF 정보 추출하기', desc: 'pdfplumber 기반 정보 추출 자동화를 다룹니다', tags: ['pdfplumber', 'regex'], items: ['계약정보 추출', 'Streamlit 연동'] },
  { id: 'ch07', num: 7, emoji: '📧', title: '이메일 자동화하기', desc: 'SMTP와 첨부파일 자동 발송을 구현합니다', tags: ['SMTP', '이메일'], items: ['설정', '자동 발송'] },
  { id: 'ch08', num: 8, emoji: '🤖', title: 'OpenAI API', desc: '회의록 요약 등 실무 예제를 통해 API를 연습합니다', tags: ['OpenAI', '요약'], items: ['키 설정', '요약 실습'] },
  { id: 'ch09', num: 9, emoji: '✍️', title: '메시지 분석과 생성하기', desc: '광고문구 생성과 인사이트 도출 패턴을 실습합니다', tags: ['프롬프트'], items: ['카피 생성', '인사이트'] },
  { id: 'ch10', num: 10, emoji: '⛓️', title: 'LangChain 요약 자동화하기', desc: 'YouTube/웹 문서 요약 파이프라인을 구성합니다', tags: ['LangChain'], items: ['요약 체인', '문서 로더'] },
  { id: 'ch11', num: 11, emoji: '🧠', title: '문서 기반 질문응답(RAG)', desc: '벡터 검색 기반 RAG를 구성합니다', tags: ['RAG', 'FAISS'], items: ['개념', '실습'] },
  { id: 'ch12', num: 12, emoji: '🎙️', title: '음성 비서 프로그램', desc: 'STT/TTS를 활용한 음성 자동화 실습입니다', tags: ['Whisper', 'gTTS'], items: ['STT', 'TTS'] },
  { id: 'ch13', num: 13, emoji: '🔗', title: '참조 사이트', desc: '공식 문서와 학습 리소스를 정리합니다', tags: ['문서'], items: ['공식 문서', '튜토리얼'] },
  { id: 'ch14', num: 14, emoji: '🔒', title: '사내 보안 & AI 활용 정책', desc: 'AI 사용 시 보안 유의사항과 절차를 안내합니다', tags: ['보안'], items: ['위험성', '절차'] },
  { id: 'ch15', num: 15, emoji: '☁️', title: 'Streamlit Cloud 웹 배포', desc: 'GitHub 연동과 Cloud 배포 절차를 실습합니다', tags: ['Cloud', '배포'], items: ['배포', 'Secrets'] },
]

const chapterContent: Record<string, string> = Object.fromEntries(
  chapters.map((chapter) => [
    chapter.id,
    `<div class="section-card">
      <h3>${chapter.emoji} ${chapter.title}</h3>
      <div class="hl-box hl-info">${chapter.desc}</div>
      <ul class="step-list">${chapter.items
        .map((item, idx) => `<li class="step-item"><div class="step-num">${idx + 1}</div><div class="step-txt">${item}</div></li>`)
        .join('')}</ul>
      <div class="hl-box hl-tip">기존 정적 HTML/JS 구조를 React 상태 기반 네비게이션으로 마이그레이션했습니다.</div>
    </div>`,
  ]),
)

function App() {
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const current = chapters[currentIdx]
  const progress = useMemo(() => Math.round(((currentIdx + 1) / chapters.length) * 100), [currentIdx])

  return (
    <div className="page">
      {!started ? (
        <section id="cover">
          <div className="cover-inner">
            <div className="cover-tag">PYTHON BUSINESS AUTOMATION & AI</div>
            <h1 className="cover-h1">
              파이썬으로 시작하는
              <br />
              <span>업무 자동화 & AI 활용</span>
            </h1>
            <p className="cover-sub">정적 HTML/CSS/JS 교육 페이지를 React + TypeScript로 마이그레이션한 버전입니다.</p>
            <div className="cover-grid">
              {chapters.map((chapter) => (
                <div className="cv-card" key={chapter.id}>
                  <div className="cv-num">CH {String(chapter.num).padStart(2, '0')}</div>
                  <div className="cv-title">
                    {chapter.emoji} {chapter.title}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-start" type="button" onClick={() => setStarted(true)}>
              학습 시작하기 →
            </button>
          </div>
        </section>
      ) : (
        <div id="app" className="app-layout">
          <aside className="sidebar">
            <div className="sb-logo">
              <div className="sb-logo-badge">PYTHON EDU</div>
              <div className="sb-logo-title">업무자동화 & AI 활용</div>
              <div className="sb-logo-sub">15 Chapters · Practical Python</div>
            </div>
            <nav className="sb-nav">
              {chapters.map((chapter, idx) => (
                <button
                  type="button"
                  key={chapter.id}
                  className={`nav-item-btn ${idx === currentIdx ? 'active' : ''}`}
                  onClick={() => setCurrentIdx(idx)}
                >
                  <span className="nav-num">{chapter.num}</span>
                  <span>{chapter.title}</span>
                  <span>{chapter.emoji}</span>
                </button>
              ))}
            </nav>
          </aside>
          <main className="main-area">
            <header className="topbar">
              <div className="topbar-title">
                {current.emoji} {current.title}
              </div>
              <div className="ch-badge">
                {currentIdx + 1} / {chapters.length}
              </div>
              <button
                className="btn-nav btn-prev"
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
              >
                ← 이전
              </button>
              <button
                className="btn-nav btn-next"
                type="button"
                disabled={currentIdx === chapters.length - 1}
                onClick={() => setCurrentIdx((prev) => prev + 1)}
              >
                다음 →
              </button>
            </header>
            <div className="content-scroll">
              <div className="ch-page">
                <div className="ch-hero">
                  <div className="ch-hero-badge">CH {String(current.num).padStart(2, '0')}</div>
                  <div className="ch-hero-title">
                    {current.emoji} {current.title}
                  </div>
                  <div className="ch-hero-desc">{current.desc}</div>
                  <div className="ch-hero-tags">
                    {current.tags.map((tag) => (
                      <span key={tag} className="ch-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="progress-text">
                    진행률 {progress}% - {currentIdx + 1}/{chapters.length} 챕터
                  </div>
                </div>
                <div className="ch-body" dangerouslySetInnerHTML={{ __html: chapterContent[current.id] }} />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default App
