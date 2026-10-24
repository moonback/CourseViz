import React from 'react';
import { GolfHole } from '../types/golf';
import { Mountain, Layers } from 'lucide-react';
import { Language, UnitSystem, formatDistance, translations } from '../utils/i18n';

interface HoleSelectorProps {
  holes: GolfHole[];
  selectedHole: GolfHole;
  onSelectHole: (hole: GolfHole) => void;
  is3DMode?: boolean;
  onToggle3DMode?: () => void;
  lang?: Language;
  unitSystem?: UnitSystem;
}

export const HoleSelector: React.FC<HoleSelectorProps> = ({
  holes,
  selectedHole,
  onSelectHole,
  is3DMode = false,
  onToggle3DMode,
  lang = 'fr',
  unitSystem = 'metric',
}) => {
  const t = translations[lang];

  return (
    <div id="hole-selector-container" className="flex items-center justify-between gap-2.5 w-full">
      {/* Hole Buttons List */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5">
        {holes.map((hole) => {
          const isSelected = hole.id === selectedHole.id;
          const courseDisplayName =
            lang === 'fr' && hole.courseNameFr
              ? hole.courseNameFr.split('(')[0].replace('Golf Links', '').replace('Golf Club', '').trim()
              : hole.courseName.split('(')[0].replace('Golf Links', '').replace('Golf Club', '').trim();

          return (
            <button
              id={`hole-tab-${hole.id}`}
              key={hole.id}
              onClick={() => onSelectHole(hole)}
              className={`flex-shrink-0 items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-150 text-left cursor-pointer border ${
                isSelected
                  ? 'bg-[#8FB062] text-[#1B291A] border-[#8FB062] shadow-sm font-bold'
                  : 'bg-[#243523] text-[#F1EDE2]/80 hover:text-white hover:bg-[#2F452E] border-[#364D34]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  isSelected ? 'bg-[#1B291A] text-[#8FB062]' : 'bg-[#152014] text-[#F1EDE2]'
                }`}
              >
                #{hole.holeNumber}
              </div>
              <div className="min-w-0 pr-0.5">
                <div className={`text-[11px] leading-tight font-bold truncate max-w-[130px] sm:max-w-none ${isSelected ? 'text-[#1B291A]' : 'text-[#F1EDE2]'}`}>
                  {courseDisplayName}
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] ${isSelected ? 'text-[#1B291A]/80 font-semibold' : 'text-[#8FB062]'}`}>
                  <span>{t.par} {hole.par}</span>
                  <span>•</span>
                  <span>{formatDistance(hole.yardage, unitSystem)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D / 2D View Mode Toggle */}
      {onToggle3DMode && (
        <div className="flex-shrink-0 pl-2 border-l border-[#2D3E2B]/80">
          <button
            id="btn-header-3d-toggle"
            onClick={onToggle3DMode}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md border ${
              is3DMode
                ? 'bg-[#8FB062] text-[#142314] hover:bg-[#7CA352] border-[#8FB062] ring-2 ring-[#8FB062]/50'
                : 'bg-[#2D3E2B] hover:bg-[#3E523B] text-[#F1EDE2] border-[#4A6347]'
            }`}
            title={is3DMode ? t.switch2D : t.switch3D}
            aria-label={is3DMode ? t.switch2D : t.switch3D}
          >
            {is3DMode ? (
              <Layers className="w-4 h-4 text-[#142314]" />
            ) : (
              <Mountain className="w-4 h-4 text-[#8FB062]" />
            )}
            <span className="whitespace-nowrap">{is3DMode ? t.switch2D : t.switch3D}</span>
          </button>
        </div>
      )}
    </div>
  );
};
