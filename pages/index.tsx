import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">말씀노트</h1>
      <p className="text-lg text-gray-600 mb-6">AI로 복음을 품다 - 설교를 쉽게, 성도와 함께</p>
      <Link href="/sermon-write">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          ✍ 말씀 쓰러 가기
        </button>
      </Link>
    </main>
  )
}
