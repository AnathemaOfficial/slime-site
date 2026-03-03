import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-foreground/10 font-mono mb-4">∅</div>
        <h1 className="text-xl font-semibold text-foreground mb-2">Non-événement</h1>
        <p className="text-sm text-muted-foreground mb-6">Cette page n'existe pas. Ce n'est pas une erreur — c'est un état terminal.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour à SYF Corp
        </Link>
      </div>
    </div>
  );
}
