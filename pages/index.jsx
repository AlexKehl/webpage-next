import Home from '@/components/Home'

export const EntryPoint = () => (
  <div className="container">
    <Home />
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: Lobster;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default EntryPoint
