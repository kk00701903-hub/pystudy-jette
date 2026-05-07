import { useEffect, useMemo, useState } from 'react'
import './App.css'
import legacyHtml from './index.html?raw'

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

function extractLegacyChapterContent(source: string): Record<string, string> {
  const content: Record<string, string> = {}
  const matcher = /<script type="text\/html" id="content-(ch\d{2})">([\s\S]*?)<\/script>/g

  for (const match of source.matchAll(matcher)) {
    const id = match[1]
    const html = match[2]?.trim()
    if (id && html) content[id] = html
  }

  return content
}

function App() {
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const current = chapters[currentIdx]
  const progress = useMemo(() => Math.round(((currentIdx + 1) / chapters.length) * 100), [currentIdx])
  const chapterContent = useMemo(() => extractLegacyChapterContent(legacyHtml), [])

  useEffect(() => {
    ;(window as Window & { answerQuiz?: (btn: HTMLButtonElement, correct: boolean, resultId: string, explanation: string) => void }).answerQuiz = (
      btn,
      correct,
      resultId,
      explanation,
    ) => {
      const optionContainer = btn.closest('.quiz-opts')
      const options = optionContainer?.querySelectorAll<HTMLButtonElement>('.quiz-opt')
      options?.forEach((option) => {
        option.disabled = true
        option.style.cursor = 'default'
      })

      btn.classList.add(correct ? 'correct' : 'wrong')
      const result = document.getElementById(resultId)
      if (!result) return
      result.className = `quiz-result show ${correct ? 'ok' : 'ng'}`
      result.innerHTML = correct ? `🎉 정답입니다! ${explanation}` : `❌ 오답입니다. ${explanation}`
    }

    const onCopyClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const btn = target?.closest?.('.copy-btn') as HTMLButtonElement | null
      if (!btn) return

      const wrap = btn.closest('.code-wrap') as HTMLElement | null
      const pre = wrap?.querySelector('pre') as HTMLPreElement | null
      const text = pre?.innerText ?? ''
      if (!text.trim()) return

      try {
        await navigator.clipboard.writeText(text)
        const original = btn.textContent
        btn.textContent = '✅ 복사됨!'
        btn.classList.add('copied')
        window.setTimeout(() => {
          btn.textContent = original || '📋 복사'
          btn.classList.remove('copied')
        }, 1800)
      } catch {
        // ignore
      }
    }

    document.addEventListener('click', onCopyClick)
    return () => {
      document.removeEventListener('click', onCopyClick)
    }
  }, [])

  useEffect(() => {
    if (!started) return

    const enhanceCopyButtons = () => {
      const codeBlocks = Array.from(document.querySelectorAll<HTMLElement>('.ch-body .code-block'))
      for (const codeBlock of codeBlocks) {
        const alreadyWrapped = codeBlock.parentElement?.classList.contains('code-wrap')
        if (alreadyWrapped) continue

        const wrap = document.createElement('div')
        wrap.className = 'code-wrap'
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'copy-btn'
        btn.textContent = '📋 복사'

        codeBlock.parentElement?.insertBefore(wrap, codeBlock)
        wrap.appendChild(btn)
        wrap.appendChild(codeBlock)
      }
    }

    const enhanceChapter1EnvSteps = () => {
      // find the legacy venv snippet and replace with step-by-step blocks
      const pres = Array.from(document.querySelectorAll<HTMLPreElement>('.ch-body pre'))
      const target = pres.find((pre) => {
        const t = pre.innerText
        return t.includes('# [Step 1]') && t.includes('python -m venv venv') && t.includes('pip install -r requirements.txt')
      })
      if (!target) return

      const step1 = 'python -m venv venv'
      const step3 = 'pip install -r requirements.txt'
      const step2 = `# Windows:\nvenv\\Scripts\\activate\n\n# Mac / Linux:\nsource venv/bin/activate`

      const codeBlock = target.closest('.code-block') as HTMLElement | null
      if (!codeBlock) return

      // update previous label if it exists
      const label = codeBlock.previousElementSibling as HTMLElement | null
      if (label?.classList.contains('code-label')) {
        label.innerHTML = '💻 각 Step별로 <strong>복사</strong> 버튼을 눌러 터미널에 바로 붙여넣기 하세요'
      }

      const container = document.createElement('div')
      container.innerHTML = `
        <div class="code-label">[Step 1] 가상환경 만들기</div>
        <div class="code-wrap"><button class="copy-btn" type="button">📋 복사</button><div class="code-block"><pre></pre></div></div>

        <div class="code-label">[Step 2] 가상환경 켜기</div>
        <div class="code-wrap"><button class="copy-btn" type="button">📋 복사</button><div class="code-block"><pre></pre></div></div>
        <div class="hl-box hl-info" style="margin-top:6px"><strong>✅ 확인:</strong> 활성화가 되면 터미널 앞에 <code>(venv)</code>가 붙습니다.</div>

        <div class="code-label">[Step 3] requirements.txt로 패키지 설치</div>
        <div class="code-wrap"><button class="copy-btn" type="button">📋 복사</button><div class="code-block"><pre></pre></div></div>
      `

      const preEls = Array.from(container.querySelectorAll<HTMLPreElement>('pre'))
      if (preEls[0]) preEls[0].innerText = step1
      if (preEls[1]) preEls[1].innerText = step2
      if (preEls[2]) preEls[2].innerText = step3

      codeBlock.replaceWith(...Array.from(container.childNodes))
    }

    // defer to ensure HTML is in DOM
    window.setTimeout(() => {
      enhanceChapter1EnvSteps()
      enhanceCopyButtons()
    }, 0)
  }, [started, currentIdx])

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
                <div
                  className="ch-body"
                  dangerouslySetInnerHTML={{
                    __html:
                      chapterContent[current.id] ??
                      `<div class="section-card"><div class="hl-box hl-info">원본 챕터 콘텐츠를 찾지 못했습니다.</div></div>`,
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default App
