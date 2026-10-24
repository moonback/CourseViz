import React, { useState } from 'react';
import { GolfHole } from '../types/golf';
import { ApiKeyBar } from './ApiKeyBar';
import { useIsLandscapeMobile } from '../utils/useIsMobile';
import {
  Flag,
  Compass,
  Wind,
  Mountain,
  ArrowRight,
  Sparkles,
  Crosshair,
  ShieldAlert,
  ChevronRight,
  Globe,
  Layers,
} from 'lucide-react';
import { Language, UnitSystem, formatDistance, translations } from '../utils/i18n';

interface WelcomeScreenProps {
  holes: GolfHole[];
  onSelectHole: (hole: GolfHole) => void;
  apiKey?: string;
  onUpdateApiKey?: (key: string) => void;
  lang: Language;
  onToggleLang: () => void;
  unitSystem: UnitSystem;
  onToggleUnitSystem: () => void;
  onOpenRoadmap: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  holes,
  onSelectHole,
  apiKey = '',
  onUpdateApiKey,
  lang,
  onToggleLang,
  unitSystem,
  onToggleUnitSystem,
  onOpenRoadmap,
}) => {
  const [activeHoleIndex, setActiveHoleIndex] = useState<number>(0);
  const selectedCourseHole = holes[activeHoleIndex] || holes[0];
  const isLandscapeMobile = useIsLandscapeMobile();
  const t = translations[lang];

  return (
    <div
      id="welcome-screen"
      className={`relative w-full h-full min-h-screen bg-[#131E12] text-[#F1EDE2] ${
        isLandscapeMobile
          ? 'p-2 sm:p-2.5 px-4 overflow-hidden'
          : 'p-4 sm:p-5 lg:px-8 lg:py-4 overflow-y-auto'
      } flex flex-col justify-between select-none`}
    >
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8FB062_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header / Branding */}
      <header
        className={`relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between border-b border-[#2D3E2B] ${
          isLandscapeMobile ? 'pb-1' : 'pb-3'
        } flex-shrink-0`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`${
              isLandscapeMobile ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 rounded-xl'
            } bg-[#8FB062] flex items-center justify-center text-[#152014] shadow-sm flex-shrink-0`}
          >
            <Flag className={`${isLandscapeMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`${
                  isLandscapeMobile ? 'text-sm' : 'text-base sm:text-lg'
                } font-black tracking-tight text-[#F1EDE2] font-serif-natural`}
              >
                {t.appTitle}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8FB062] bg-[#8FB062]/20 px-2 py-0.5 rounded-full border border-[#8FB062]/30">
                2D &amp; 3D
              </span>
            </div>
            <p className={`${isLandscapeMobile ? 'text-[9px]' : 'text-[11px]'} text-[#A8B89F]`}>
              {t.appSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#A8B89F]">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#243523] hover:bg-[#2F452E] text-[#F1EDE2] border border-[#364D34] cursor-pointer transition font-bold shadow-xs text-xs"
            title={lang === 'fr' ? 'Passer en Anglais' : 'Switch to French'}
          >
            <Globe className="w-3.5 h-3.5 text-[#8FB062]" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Unit Toggle */}
          <button
            onClick={onToggleUnitSystem}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#243523] hover:bg-[#2F452E] text-[#F1EDE2] border border-[#364D34] cursor-pointer transition font-bold shadow-xs text-xs"
            title={unitSystem === 'metric' ? 'Unités impériales (Yards)' : 'Unités métriques (Mètres)'}
          >
            <span>{unitSystem === 'metric' ? 'm / km/h' : 'yds / mph'}</span>
          </button>

          {/* Roadmap Button */}
          <button
            onClick={onOpenRoadmap}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#8FB062]/20 hover:bg-[#8FB062]/30 text-[#8FB062] border border-[#8FB062]/40 cursor-pointer transition font-bold shadow-xs text-xs"
            title="Consulter la feuille de route du projet"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.roadmap}</span>
          </button>

          {onUpdateApiKey && (
            <ApiKeyBar apiKey={apiKey} onUpdateApiKey={onUpdateApiKey} />
          )}
        </div>
      </header>

      {/* Main Content Area: Responsive 2-Column Grid */}
      <main
        className={`relative z-10 max-w-6xl w-full mx-auto my-auto ${
          isLandscapeMobile ? 'py-1' : 'py-3 sm:py-5'
        } flex-1 flex items-center`}
      >
        <div
          className={`w-full grid ${
            isLandscapeMobile
              ? 'grid-cols-12 gap-3.5'
              : 'grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8'
          } items-center`}
        >
          {/* Left Column: Hero & Feature Pills */}
          <div
            className={`${
              isLandscapeMobile ? 'col-span-5' : 'lg:col-span-6'
            } flex flex-col justify-center text-left`}
          >
            <div
              className={`inline-flex items-center gap-1.5 rounded-full bg-[#1F2F1E] border border-[#2D3E2B] font-semibold text-[#8FB062] w-fit ${
                isLandscapeMobile ? 'px-2 py-0.5 text-[9px] mb-1' : 'px-3 py-1 text-[11px] mb-2.5'
              }`}
            >
              <Sparkles className={`${isLandscapeMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#8FB062]`} />
              <span>{t.welcomeBadge}</span>
            </div>

            <h1
              className={`${
                isLandscapeMobile
                  ? 'text-base sm:text-lg font-bold mb-1 leading-snug'
                  : 'text-2xl sm:text-3xl lg:text-4xl font-bold mb-2.5 leading-tight font-serif-natural'
              } tracking-tight text-[#F1EDE2]`}
            >
              {t.welcomeTitle}
            </h1>

            <p
              className={`${
                isLandscapeMobile
                  ? 'text-[10px] text-[#BCC9B4] mb-1.5 line-clamp-2 leading-tight'
                  : 'text-xs sm:text-sm text-[#BCC9B4] mb-4 leading-relaxed'
              } max-w-lg`}
            >
              {t.welcomeSubtitle}
            </p>

            {/* Feature Pill Grid */}
            <div
              className={`grid grid-cols-2 ${isLandscapeMobile ? 'gap-1.5' : 'gap-2'} max-w-lg mb-4`}
            >
              <div
                className={`${
                  isLandscapeMobile ? 'p-1.5 rounded-lg' : 'p-2 sm:p-2.5 rounded-xl'
                } bg-[#1B291A] border border-[#2D3E2B]`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EDE2] mb-0.5">
                  <Crosshair
                    className={`${
                      isLandscapeMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'
                    } text-[#8FB062] flex-shrink-0`}
                  />
                  <span className={isLandscapeMobile ? 'text-[10px]' : 'text-xs'}>
                    {lang === 'fr' ? 'Stratégies Multi-Coups' : 'Multi-Shot Runs'}
                  </span>
                </div>
                {!isLandscapeMobile && (
                  <p className="text-[10px] sm:text-[11px] text-[#A8B89F] leading-snug">
                    {lang === 'fr' ? 'Attaque birdie en 2 coups ou par sécurisé en 3 coups.' : '2-shot birdie attack or 3-shot tactical par runs.'}
                  </p>
                )}
              </div>

              <div
                className={`${
                  isLandscapeMobile ? 'p-1.5 rounded-lg' : 'p-2 sm:p-2.5 rounded-xl'
                } bg-[#1B291A] border border-[#2D3E2B]`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EDE2] mb-0.5">
                  <Mountain
                    className={`${
                      isLandscapeMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'
                    } text-[#8FB062] flex-shrink-0`}
                  />
                  <span className={isLandscapeMobile ? 'text-[10px]' : 'text-xs'}>
                    {lang === 'fr' ? 'Dénivelé & Pente Réels' : 'True Topography'}
                  </span>
                </div>
                {!isLandscapeMobile && (
                  <p className="text-[10px] sm:text-[11px] text-[#A8B89F] leading-snug">
                    {lang === 'fr' ? 'Distance perçue calculée selon la dénivellation.' : 'Plays-like distance computed with vertical slope.'}
                  </p>
                )}
              </div>

              <div
                className={`${
                  isLandscapeMobile ? 'p-1.5 rounded-lg' : 'p-2 sm:p-2.5 rounded-xl'
                } bg-[#1B291A] border border-[#2D3E2B]`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EDE2] mb-0.5">
                  <Wind
                    className={`${
                      isLandscapeMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'
                    } text-[#8FB062] flex-shrink-0`}
                  />
                  <span className={isLandscapeMobile ? 'text-[10px]' : 'text-xs'}>
                    {lang === 'fr' ? 'Dérive au Vent Réelle' : 'Live Wind Drift'}
                  </span>
                </div>
                {!isLandscapeMobile && (
                  <p className="text-[10px] sm:text-[11px] text-[#A8B89F] leading-snug">
                    {lang === 'fr' ? 'Déviation vectorielle selon l’angle et la vitesse.' : 'Breeze speed and direction vector deflection.'}
                  </p>
                )}
              </div>

              <div
                className={`${
                  isLandscapeMobile ? 'p-1.5 rounded-lg' : 'p-2 sm:p-2.5 rounded-xl'
                } bg-[#1B291A] border border-[#2D3E2B]`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1EDE2] mb-0.5">
                  <Layers
                    className={`${
                      isLandscapeMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'
                    } text-[#8FB062] flex-shrink-0`}
                  />
                  <span className={isLandscapeMobile ? 'text-[10px]' : 'text-xs'}>
                    {lang === 'fr' ? '3D Photoréaliste' : 'Photorealistic 3D'}
                  </span>
                </div>
                {!isLandscapeMobile && (
                  <p className="text-[10px] sm:text-[11px] text-[#A8B89F] leading-snug">
                    {lang === 'fr' ? 'Google 3D Tiles avec orbite et inclinaison libre.' : 'Google 3D Tiles with full orbit and tilt controls.'}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Course Selector Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B89F]">
                {lang === 'fr' ? 'Parcours Disponibles :' : 'Available Championship Holes:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {holes.map((hole, idx) => (
                  <button
                    key={hole.id}
                    onClick={() => setActiveHoleIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                      activeHoleIndex === idx
                        ? 'bg-[#8FB062] text-[#142314] border-[#8FB062] shadow-sm'
                        : 'bg-[#1C2C1B] text-[#F1EDE2]/80 hover:bg-[#253A23] border-[#364D34]'
                    }`}
                  >
                    <span>#{hole.holeNumber}</span>
                    <span className="truncate max-w-[120px]">
                      {lang === 'fr' && hole.courseNameFr ? hole.courseNameFr.split('(')[0].trim() : hole.courseName.split('(')[0].trim()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Championship Hole Card */}
          <div
            className={`${
              isLandscapeMobile ? 'col-span-7' : 'lg:col-span-6'
            } flex flex-col justify-center`}
          >
            <div
              className={`flex items-center justify-between ${
                isLandscapeMobile ? 'mb-1' : 'mb-1.5'
              } px-0.5`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FB062]">
                {lang === 'fr' ? 'Trou Sélectionné' : 'Selected Hole'}
              </span>
              <span className="text-[10px] text-[#A8B89F]">
                {lang === 'fr' ? 'Simulation Interactive 2D / 3D' : 'Interactive Simulation'}
              </span>
            </div>

            {selectedCourseHole && (
              <div
                id="welcome-select-hole-card"
                onClick={() => onSelectHole(selectedCourseHole)}
                className={`group relative bg-[#182417] hover:bg-[#1E2D1D] ${
                  isLandscapeMobile ? 'rounded-xl p-2.5 sm:p-3' : 'rounded-2xl p-4 sm:p-5'
                } border border-[#2D3E2B] hover:border-[#8FB062] transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl flex flex-col justify-between`}
              >
                {/* Card Header & Badge */}
                <div>
                  <div
                    className={`flex items-center justify-between ${
                      isLandscapeMobile ? 'mb-1' : 'mb-2'
                    }`}
                  >
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#8FB062]/20 text-[#8FB062] border border-[#8FB062]/40">
                      {selectedCourseHole.id === 'golf-national-18'
                        ? 'Guyancourt / Paris, France 🇫🇷'
                        : selectedCourseHole.id === 'augusta-12'
                          ? 'Augusta, GA, USA 🇺🇸'
                          : 'Monterey Peninsula, CA, USA 🇺🇸'}
                    </span>
                    <span
                      className={`${
                        isLandscapeMobile ? 'text-[11px]' : 'text-xs'
                      } font-semibold text-[#A8B89F]`}
                    >
                      {t.par} {selectedCourseHole.par} • {formatDistance(selectedCourseHole.yardage, unitSystem)}
                    </span>
                  </div>

                  <div className={isLandscapeMobile ? 'mb-1' : 'mb-1.5'}>
                    <h3
                      className={`${
                        isLandscapeMobile ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
                      } font-bold text-[#F1EDE2] group-hover:text-[#8FB062] transition-colors leading-tight font-serif-natural`}
                    >
                      {lang === 'fr' && selectedCourseHole.courseNameFr
                        ? selectedCourseHole.courseNameFr
                        : selectedCourseHole.courseName}
                    </h3>
                    <p
                      className={`${
                        isLandscapeMobile ? 'text-xs' : 'text-sm'
                      } font-semibold text-[#8FB062]`}
                    >
                      {t.hole} #{selectedCourseHole.holeNumber} — "
                      {lang === 'fr' && selectedCourseHole.holeNameFr
                        ? selectedCourseHole.holeNameFr
                        : selectedCourseHole.holeName}
                      "
                    </p>
                  </div>

                  <p
                    className={`${
                      isLandscapeMobile
                        ? 'text-[10px] line-clamp-1 mb-1.5'
                        : 'text-[11px] sm:text-xs mb-3 line-clamp-2'
                    } text-[#BCC9B4] leading-relaxed`}
                  >
                    {lang === 'fr' && selectedCourseHole.descriptionFr
                      ? selectedCourseHole.descriptionFr
                      : selectedCourseHole.description}
                  </p>

                  {/* Key Metrics */}
                  <div
                    className={`grid grid-cols-3 gap-1.5 ${
                      isLandscapeMobile ? 'py-1 mb-1.5' : 'gap-2 py-2 mb-3'
                    } border-y border-[#2D3E2B] text-center`}
                  >
                    <div className="bg-[#121A11] p-1 sm:p-1.5 rounded-lg">
                      <span className="block text-[8px] uppercase tracking-wide text-[#A8B89F]">
                        {t.elevationDrop}
                      </span>
                      <span
                        className={`${
                          isLandscapeMobile ? 'text-[11px]' : 'text-xs'
                        } font-bold text-[#F1EDE2]`}
                      >
                        {formatDistance(selectedCourseHole.elevationChangeYards, unitSystem)}
                      </span>
                    </div>
                    <div className="bg-[#121A11] p-1 sm:p-1.5 rounded-lg">
                      <span className="block text-[8px] uppercase tracking-wide text-[#A8B89F]">
                        {t.effectiveDistance}
                      </span>
                      <span
                        className={`${
                          isLandscapeMobile ? 'text-[11px]' : 'text-xs'
                        } font-bold text-[#8FB062]`}
                      >
                        {formatDistance(selectedCourseHole.yardage + selectedCourseHole.elevationChangeYards, unitSystem)}
                      </span>
                    </div>
                    <div className="bg-[#121A11] p-1 sm:p-1.5 rounded-lg">
                      <span className="block text-[8px] uppercase tracking-wide text-[#A8B89F]">
                        {t.handicap}
                      </span>
                      <span
                        className={`${
                          isLandscapeMobile ? 'text-[11px]' : 'text-xs'
                        } font-bold text-[#F1EDE2]`}
                      >
                        HCP {selectedCourseHole.handicap}
                      </span>
                    </div>
                  </div>

                  {/* Tactical Highlights */}
                  <div
                    className={`${
                      isLandscapeMobile ? 'space-y-0.5 mb-2 text-[10px]' : 'space-y-1 mb-4 text-[11px]'
                    } text-[#A8B89F]`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#8FB062] flex-shrink-0" />
                      <span className="text-[#F1EDE2] font-semibold">
                        {lang === 'fr'
                          ? 'Stratégies 2 Coups (Birdie) ou 3 Coups (Par Sécurisé)'
                          : '2-Shot Birdie Attack or 3-Shot Gale Par'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3 h-3 text-[#C2921D] flex-shrink-0" />
                      <span className="truncate">
                        {selectedCourseHole.hazards.length} {lang === 'fr' ? 'obstacles majeurs répertoriés' : 'major hazards mapped'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  type="button"
                  className={`w-full ${
                    isLandscapeMobile
                      ? 'py-1.5 px-3 rounded-lg text-xs'
                      : 'py-2.5 px-4 rounded-xl text-xs sm:text-sm'
                  } font-bold bg-[#8FB062] group-hover:bg-[#9EBF6F] text-[#152014] flex items-center justify-center gap-2 shadow-sm transition-all`}
                >
                  <span>
                    {t.startExploring} (#{selectedCourseHole.holeNumber})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer
        className={`relative z-10 max-w-6xl w-full mx-auto ${
          isLandscapeMobile ? 'pt-1 text-[9px]' : 'pt-2.5 text-[11px]'
        } border-t border-[#2D3E2B] flex flex-row items-center justify-between gap-2 text-[#A8B89F] flex-shrink-0`}
      >
        <p>© CourseViz — {t.appSubtitle}</p>
        <p className="flex items-center gap-1">
          <span>Google Maps Platform &amp; Photorealistic 3D Tiles</span>
        </p>
      </footer>
    </div>
  );
};
