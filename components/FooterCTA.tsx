export default function FooterCTA() {
  return (
    <footer className="mt-12">
      <div className="container mx-auto px-4 py-8">
        <button
          className="px-6 py-3 rounded text-white font-semibold interface-font"
          style={{ background: 'var(--brand, #00a826)' }}
        >
          Join Now
        </button>
      </div>
    </footer>
  );
}