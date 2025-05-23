import { useState } from 'react'

export default function SermonWriteScreen() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [recording, setRecording] = useState(false)

  const handleSave = () => {
    const saved = { title, content, date: new Date().toISOString() }
    localStorage.setItem(`sermon-${saved.date}`, JSON.stringify(saved))
    alert('설교가 저장되었습니다.')
  }

  const handleLoad = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('sermon-'))
    if (keys.length === 0) return alert('저장된 설교가 없습니다.')
    const last = JSON.parse(localStorage.getItem(keys.sort().pop()))
    setTitle(last.title)
    setContent(last.content)
  }

  const handleSpeechToText = async () => {
    try {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.lang = 'ko-KR'
      recognition.start()
      setRecording(true)
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript
        setContent(prev => prev + ' ' + transcript)
        setRecording(false)
      }
      recognition.onerror = () => setRecording(false)
    } catch (err) {
      alert('음성 인식이 지원되지 않습니다.')
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📖 설교 작성</h1>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <textarea
        placeholder="말씀 내용을 입력하세요..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={10}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleSave}>💾 저장</button>
        <button onClick={handleLoad}>📂 불러오기</button>
        <button onClick={handleSpeechToText}>{recording ? '🎙 녹음 중...' : '🎤 음성입력'}</button>
      </div>
    </div>
  )
}
