import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Mic, Save, FolderOpen } from 'lucide-react'

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📖 설교 작성</h1>
      <Input 
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="mb-3"
      />
      <Textarea
        placeholder="말씀 내용을 입력하세요..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={10}
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> 저장
        </Button>
        <Button onClick={handleLoad} variant="secondary">
          <FolderOpen className="mr-2 h-4 w-4" /> 불러오기
        </Button>
        <Button onClick={handleSpeechToText} variant={recording ? 'destructive' : 'outline'}>
          <Mic className="mr-2 h-4 w-4 animate-pulse" /> {recording ? '녹음 중...' : '🎙 음성입력'}
        </Button>
      </div>
    </div>
  )
}
