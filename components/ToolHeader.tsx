import DocNav from './DocNav'

export default function ToolHeader() {
  return (
    <header className="px-4 sm:px-6 pt-4">
      <div className="max-w-[1600px] mx-auto">
        <a
          href="/"
          className="font-mono font-bold text-xl text-white tracking-tight hover:text-green-300 transition-colors"
        >
          freelegalforms.app
        </a>
      </div>
      <DocNav />
    </header>
  )
}
