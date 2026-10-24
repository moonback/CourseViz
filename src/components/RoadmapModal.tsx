import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
  Cpu,
  Layers,
  FileText,
  MapPin,
  X,
  ChevronRight,
  TrendingUp,
  Globe,
  Radio,
  Share2,
  Flag,
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'phases' | 'tech' | 'vision'>('phases');
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div
      id="roadmap-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="roadmap-modal-card"
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFCF9] text-[#2C3327] rounded-3xl shadow-2xl border border-[#DED9CC] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#DED9CC] bg-[#152014] text-[#F1EDE2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8FB062] text-[#152014] flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8FB062] bg-[#8FB062]/15 px-2 py-0.5 rounded-full border border-[#8FB062]/30">
                  {t.roadmapBadge}
                </span>
                <span className="text-xs text-[#A8B89F]">CourseViz v2.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#F1EDE2] font-serif-natural mt-0.5">
                {t.roadmapTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#A8B89F] mt-0.5">
                {t.roadmapSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A8B89F] hover:text-[#F1EDE2] hover:bg-white/10 transition cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-[#DED9CC] bg-[#F1EDE2]/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('phases')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'phases'
                ? 'bg-[#152014] text-[#F1EDE2] shadow-sm'
                : 'text-[#5C6353] hover:text-[#152014] hover:bg-[#EBE7DD]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Phases de la Roadmap' : 'Roadmap Phases'}</span>
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'tech'
                ? 'bg-[#152014] text-[#F1EDE2] shadow-sm'
                : 'text-[#5C6353] hover:text-[#152014] hover:bg-[#EBE7DD]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Architecture & Innovations' : 'Architecture & Tech'}</span>
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'vision'
                ? 'bg-[#152014] text-[#F1EDE2] shadow-sm'
                : 'text-[#5C6353] hover:text-[#152014] hover:bg-[#EBE7DD]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Vision Produit & Cible' : 'Product Vision'}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-170px)] space-y-6">
          {activeTab === 'phases' && (
            <div className="space-y-4">
              {/* Phase 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#8FB062]/40 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#8FB062]" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#8FB062]/20 text-[#2C421C] font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-bold text-base text-[#152014]">
                      {t.roadmapPhase1Title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#8FB062]/20 text-[#2C421C] border border-[#8FB062]/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.roadmapPhase1Status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6353] mb-3 leading-relaxed">
                  {lang === 'fr'
                    ? "Passage en français intégral, gestion bilingue FR/EN instantanée, support des unités métriques (mètres et km/h en plus des yards et mph) et intégration de nouveaux trous emblématiques dont Le Golf National (Trou 18 de la Ryder Cup 2018 et des JO Paris 2024) et Augusta National (Trou 12 Golden Bell)."
                    : "Full French localization, instant bilingual toggle FR/EN, metric support (meters and km/h alongside yards and mph), and addition of iconic world championship holes including Le Golf National Hole 18 (Paris 2024 Olympics / 2018 Ryder Cup) and Augusta National Hole 12 (Golden Bell)."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#5A7A3A]" />
                    <span>{lang === 'fr' ? 'Bilinguisme dynamique' : 'Dynamic bilingual UI'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Flag className="w-3.5 h-3.5 text-[#5A7A3A]" />
                    <span>{lang === 'fr' ? 'Le Golf National & Augusta' : 'Le Golf National & Augusta'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#5A7A3A]" />
                    <span>{lang === 'fr' ? 'Conversion Mètres / Yards' : 'Meters & Yards converter'}</span>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DED9CC] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#3B82F6]" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-bold text-base text-[#152014]">
                      {t.roadmapPhase2Title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <Clock className="w-3.5 h-3.5" /> {t.roadmapPhase2Status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6353] mb-3 leading-relaxed">
                  {lang === 'fr'
                    ? "Activation du SDK Google Gen AI (@google/genai déjà présent dans le projet) pour créer un véritable Caddie IA conversationnel. Il prend en compte le handicap du joueur, la météo réelle et la dispersion de ses clubs pour fournir une recommandation stratégique personnalisée et vocale."
                    : "Activation of the Google Gen AI SDK (@google/genai already in dependencies) for a conversational AI Caddie. It adapts to the player's handicap, live wind gusts, and club dispersion for personalized verbal and tactical advice."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Gemini 2.5 Flash Caddie</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'fr' ? 'Conseils audio & synthèse' : 'Voice audio notes'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'fr' ? 'Adaptation par handicap' : 'Handicap customized'}</span>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DED9CC] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#F59E0B]" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-bold text-base text-[#152014]">
                      {t.roadmapPhase3Title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3.5 h-3.5" /> {t.roadmapPhase3Status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6353] mb-3 leading-relaxed">
                  {lang === 'fr'
                    ? "Mode 'Partie Réelle' avec géolocalisation GPS en direct du golfeur sur le parcours. Calcul automatique de la distance restante jusqu'à l'entrée, le centre et le fond du green, enregistrement coup par coup (Shot Tracker) et scorecard Stroke Play / Stableford avec calcul de Fairways touchés et GIR (Greens en régulation)."
                    : "Real-round live mode with mobile device GPS geolocation. Real-time yardage to front, center, back of green, shot tracking with actual club distances, and complete scorecard with Fairways in Regulation and GIR stats."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'fr' ? 'GPS live sur le terrain' : 'Live on-course GPS'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'fr' ? 'Scorecard & stats avancées' : 'Digital Scorecard'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'fr' ? 'Calcul réels de carry' : 'Real shot distance tracking'}</span>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DED9CC] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-purple-500" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">
                      4
                    </span>
                    <h3 className="font-bold text-base text-[#152014]">
                      {t.roadmapPhase4Title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    <Clock className="w-3.5 h-3.5" /> {t.roadmapPhase4Status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6353] mb-3 leading-relaxed">
                  {lang === 'fr'
                    ? "Animation cinématographique de caméra 'Flyover' (survol automatisé du départ au green le long de la ligne idéale de jeu), et intégration de cartes thermiques (heatmaps) 3D de pente de green avec flèches de break en temps réel pour une lecture de putt digne du PGA Tour."
                    : "Automated cinematic camera flyover from tee box to green along optimal flight path, plus 3D green slope heatmaps with animated roll break arrows for PGA Tour-level putting analysis."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    <span>{lang === 'fr' ? 'Heatmap 3D des greens' : '3D Green heatmaps'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-purple-600" />
                    <span>{lang === 'fr' ? 'Survol drone cinématique' : 'Cinematic drone flyover'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>{lang === 'fr' ? 'Simulation roule de balle' : 'Ball rollout physics'}</span>
                  </div>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DED9CC] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-600" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                      5
                    </span>
                    <h3 className="font-bold text-base text-[#152014]">
                      {t.roadmapPhase5Title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Clock className="w-3.5 h-3.5" /> {t.roadmapPhase5Status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6353] mb-3 leading-relaxed">
                  {lang === 'fr'
                    ? "Compatibilité Progressive Web App (PWA) avec Service Worker et stockage IndexedDB local pour utiliser l'application sur le parcours même en zone blanche sans réseau 4G/5G. Générateur de carnet de parcours PDF exportable et imprimable avec annotations tactiques."
                    : "PWA integration with Service Workers and IndexedDB cache for on-course usage in dead cellular zones. Printable high-resolution PDF Yardage Book export with personalized tactical annotations."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{lang === 'fr' ? 'PWA installable hors-ligne' : 'Offline installable PWA'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{lang === 'fr' ? 'Export Yardage Book PDF' : 'PDF Yardage book export'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F1EDE2] text-[#2C3327] font-medium flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{lang === 'fr' ? 'Partage communautaire' : 'Community hole sharing'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#2C3327]">
              <div className="p-4 rounded-2xl bg-white border border-[#DED9CC]">
                <h4 className="font-bold text-sm text-[#152014] mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#5A7A3A]" />
                  {lang === 'fr' ? 'Moteur Cartographique & 3D WebGL' : 'Mapping & 3D WebGL Engine'}
                </h4>
                <p className="text-[#5C6353] leading-relaxed mb-3">
                  {lang === 'fr'
                    ? "CourseViz s'appuie sur l'API Google Maps JavaScript v3 associée à la bibliothèque expérimentale Google Maps 3D (Photorealistic 3D Tiles). Le basculement entre la vue 2D satellite haute résolution et la vue 3D s'effectue en temps réel avec synchronisation des coordonnées géodésiques et des repères d'obstacles."
                    : "CourseViz combines Google Maps JavaScript API v3 with Google Photorealistic 3D Tiles (maps3d). Switching between high-resolution 2D satellite imagery and photorealistic 3D meshes happens with synced geodetic coordinates and targets."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DED9CC]">
                <h4 className="font-bold text-sm text-[#152014] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#5A7A3A]" />
                  {lang === 'fr' ? 'Moteur Balistique & Physique du Coup' : 'Ballistic & Physics Engine'}
                </h4>
                <p className="text-[#5C6353] leading-relaxed mb-3">
                  {lang === 'fr'
                    ? "Le module `geo.ts` calcule la formule de grand cercle (Haversine) pour les distances, les relèvements azimutaux et projette les trajectoires paraboliques 3D en tenant compte de la dénivellation, de la portance aérodynamique des lofts de clubs, des composantes vectorielles du vent (vent arrière/face et dérive latérale) et de la dispersion statistique du swing."
                    : "The `geo.ts` module computes great-circle distances, bearings, and 3D parabolic flight trajectories taking into account elevation change, club loft aerodynamics, wind vectors (headwind/tailwind and crosswind push), and swing dispersion."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DED9CC]">
                <h4 className="font-bold text-sm text-[#152014] mb-2 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#5A7A3A]" />
                  {lang === 'fr' ? 'Système d’Internationalisation & Unités' : 'Internationalization & Metric Engine'}
                </h4>
                <p className="text-[#5C6353] leading-relaxed">
                  {lang === 'fr'
                    ? "Architecture i18n sans dépendance externe lourde, supportant le basculement instantané Français / Anglais et la conversion transparente Mètres / Yards et km/h / mph sur tous les composants (drapeaux, cercles de distance, profil altimétrique et caddie)."
                    : "Zero-dependency reactive i18n architecture supporting seamless French / English language toggling and instant Meters / Yards and km/h / mph conversions across all widgets."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#2C3327]">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#152014] text-[#F1EDE2]">
                <h4 className="font-bold text-base text-[#8FB062] mb-1 font-serif-natural">
                  {lang === 'fr' ? 'La Vision de CourseViz' : 'The CourseViz Vision'}
                </h4>
                <p className="text-[#A8B89F] leading-relaxed mb-4">
                  {lang === 'fr'
                    ? "Démocratiser la stratégie de niveau 'PGA Tour' pour tous les golfeurs francophones et mondiaux. Permettre d'aborder chaque trou avec l'œil d'un caddie professionnel grâce à la fusion de l'imagerie 3D photoréaliste, des modèles physiques de vol de balle et de l'intelligence artificielle."
                    : "Democratize PGA Tour-grade golf intelligence for players worldwide. Tackle any iconic hole with the eyes of a master caddie through the fusion of photorealistic 3D imagery, flight physics, and generative AI."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#8FB062] font-bold block mb-1">
                      {lang === 'fr' ? '🎯 Public Cible' : '🎯 Target Audience'}
                    </span>
                    <span className="text-white/80">
                      {lang === 'fr'
                        ? 'Golfeurs passionnés (index 0 à 36), entraîneurs, spectateurs de tournois et gamers souhaitant préparer leurs parcours.'
                        : 'Avid golfers (scratch to 36 handicap), golf coaches, tournament spectators, and visual course architects.'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#8FB062] font-bold block mb-1">
                      {lang === 'fr' ? '⚡ Différenciateur Clé' : '⚡ Key Differentiator'}
                    </span>
                    <span className="text-white/80">
                      {lang === 'fr'
                        ? 'Pas seulement une carte 2D statique : un simulateur balistique interactif avec 3D photoréaliste Google et dénivellation réelle.'
                        : 'Not just a 2D static map: an interactive ballistic simulator with Google Photorealistic 3D and true topography.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#DED9CC] bg-[#F1EDE2] flex items-center justify-between text-xs text-[#5C6353]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#8FB062] inline-block animate-pulse" />
            {lang === 'fr' ? 'Roadmap mise à jour pour 2026' : 'Roadmap active for 2026'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#152014] text-[#F1EDE2] font-bold hover:bg-[#253A23] transition cursor-pointer shadow-sm"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
