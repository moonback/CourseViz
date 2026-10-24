import React, { useState } from 'react';
import { GolfHole, Hazard, LatLngLiteral } from '../types/golf';
import {
  BookOpen,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  Mountain,
  Grid3X3,
  TrendingDown,
  Gauge,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { ElevationProfileChart } from './ElevationProfileChart';
import { Language, UnitSystem, formatDistance, formatFeet, translations } from '../utils/i18n';

interface HoleInfoPanelProps {
  hole: GolfHole;
  teePosition?: LatLngLiteral;
  targetPosition?: LatLngLiteral;
  pinPosition?: LatLngLiteral;
  onSetTarget?: (target: LatLngLiteral) => void;
  onFocusHazard?: (hazard: Hazard) => void;
  onInspectGreen?: () => void;
  onCloseMobile?: () => void;
  defaultExpanded?: boolean;
  lang?: Language;
  unitSystem?: UnitSystem;
}

export const HoleInfoPanel: React.FC<HoleInfoPanelProps> = ({
  hole,
  teePosition,
  targetPosition,
  pinPosition,
  onSetTarget,
  onFocusHazard,
  onInspectGreen,
  onCloseMobile,
  defaultExpanded = true,
  lang = 'fr',
  unitSystem = 'metric',
}) => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'elevation' | 'hazards' | 'history'>('strategy');
  const [isCollapsed, setIsCollapsed] = useState(!defaultExpanded);
  const [isCaddieAdviceOpen, setIsCaddieAdviceOpen] = useState(false);
  const t = translations[lang];

  const caddieText = lang === 'fr' && hole.caddieNotesFr ? hole.caddieNotesFr : hole.caddieNotes;
  const historyText = lang === 'fr' && hole.historyFr ? hole.historyFr : hole.history;
  const descriptionText = lang === 'fr' && hole.descriptionFr ? hole.descriptionFr : hole.description;

  return (
    <div
      id="hole-info-drawer"
      className={`bg-[#FDFCF9]/95 backdrop-blur-md border border-[#DED9CC] text-[#2C3327] rounded-3xl shadow-2xl flex flex-col transition-all duration-200 overflow-hidden ${
        isCollapsed ? '' : 'max-h-[58vh] md:max-h-[75vh]'
      }`}
    >
      {/* Mobile Drawer Grab Pill */}
      <div className="md:hidden pt-2 pb-0.5 flex justify-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="w-10 h-1 rounded-full bg-[#DED9CC]" />
      </div>

      {/* Top Header with Title and Folding Accordion Button on Top Right */}
      <div
        className={`flex items-start justify-between gap-2 p-4 sm:p-5 flex-shrink-0 z-10 transition-all ${
          isCollapsed
            ? 'pb-4 bg-transparent cursor-pointer'
            : 'pb-3 border-b border-[#DED9CC]/60 sticky top-0 bg-[#FDFCF9]/95 backdrop-blur-md'
        }`}
        onClick={() => {
          if (isCollapsed) setIsCollapsed(false);
        }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[#5A7A3A] text-[10px] font-bold uppercase tracking-[0.2em]">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t.caddieIntelligence}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-[#1B291A] mt-0.5 font-serif-natural truncate">
            {t.caddieTitle}
          </h3>
          {isCollapsed && (
            <div className="flex items-center gap-2 mt-1.5 text-xs text-[#5C6353] font-medium">
              <span className="bg-[#5A7A3A]/15 text-[#2C421C] font-bold px-2 py-0.5 rounded-md border border-[#5A7A3A]/30 capitalize">
                {activeTab === 'strategy'
                  ? t.tabStrategy
                  : activeTab === 'elevation'
                    ? t.tabElevation
                    : activeTab === 'hazards'
                      ? t.tabHazards
                      : t.tabHistory}
              </span>
              <span className="truncate max-w-[200px]">
                {activeTab === 'hazards'
                  ? `${hole.hazards.length} ${t.tabHazards.toLowerCase()}`
                  : activeTab === 'elevation'
                    ? `${t.elevationDrop}: ${formatDistance(hole.elevationChangeYards, unitSystem)}`
                    : caddieText.slice(0, 45) + '...'}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            id="btn-toggle-hole-info"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-2 rounded-xl bg-[#EBE7DD]/80 hover:bg-[#E0DBCF] text-[#5C6353] hover:text-[#1B291A] transition border border-[#DED9CC] flex items-center justify-center cursor-pointer shadow-xs flex-shrink-0"
            title={isCollapsed ? 'Développer' : 'Réduire'}
            aria-label={isCollapsed ? 'Développer' : 'Réduire'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          {onCloseMobile && (
            <button
              id="btn-close-hole-info-mobile"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCloseMobile();
              }}
              className="p-2 rounded-xl bg-[#EBE7DD]/80 hover:bg-[#E0DBCF] text-[#5C6353] hover:text-[#1B291A] transition border border-[#DED9CC] flex items-center justify-center cursor-pointer shadow-xs flex-shrink-0"
              title={t.close}
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="overflow-y-auto overflow-x-hidden p-4 sm:p-5 pt-3 space-y-4 flex-1 overscroll-contain">
          {/* Tab Navigation */}
          <div role="tablist" aria-label="Course Intelligence Views" className="grid grid-cols-4 gap-1 bg-[#EBE7DD] p-1 rounded-2xl border border-[#DED9CC] w-full box-border">
            <button
              id="tab-strategy"
              role="tab"
              aria-selected={activeTab === 'strategy'}
              aria-controls="panel-strategy"
              onClick={() => setActiveTab('strategy')}
              className={`py-2 px-1 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer min-w-0 ${
                activeTab === 'strategy'
                  ? 'bg-[#8FB062] text-[#152014] font-bold shadow-sm'
                  : 'text-[#5C6353] hover:text-[#1B291A] hover:bg-[#F1EDE2]'
              }`}
              title={t.tabStrategy}
            >
              <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{t.tabStrategy}</span>
            </button>

            <button
              id="tab-elevation"
              role="tab"
              aria-selected={activeTab === 'elevation'}
              aria-controls="panel-elevation"
              onClick={() => setActiveTab('elevation')}
              className={`py-2 px-1 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer min-w-0 ${
                activeTab === 'elevation'
                  ? 'bg-[#8FB062] text-[#152014] font-bold shadow-sm'
                  : 'text-[#5C6353] hover:text-[#1B291A] hover:bg-[#F1EDE2]'
              }`}
              title={t.tabElevation}
            >
              <Mountain className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{t.tabElevation}</span>
            </button>

            <button
              id="tab-hazards"
              role="tab"
              aria-selected={activeTab === 'hazards'}
              aria-controls="panel-hazards"
              onClick={() => setActiveTab('hazards')}
              className={`py-2 px-1 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer min-w-0 ${
                activeTab === 'hazards'
                  ? 'bg-[#8FB062] text-[#152014] font-bold shadow-sm'
                  : 'text-[#5C6353] hover:text-[#1B291A] hover:bg-[#F1EDE2]'
              }`}
              title={`${t.tabHazards} (${hole.hazards.length})`}
            >
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{t.tabHazards}</span>
            </button>

            <button
              id="tab-history"
              role="tab"
              aria-selected={activeTab === 'history'}
              aria-controls="panel-history"
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer min-w-0 ${
                activeTab === 'history'
                  ? 'bg-[#8FB062] text-[#152014] font-bold shadow-sm'
                  : 'text-[#5C6353] hover:text-[#1B291A] hover:bg-[#F1EDE2]'
              }`}
              title={t.tabHistory}
            >
              <Award className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{t.tabHistory}</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[160px]">
            {activeTab === 'strategy' && (
              <div className="flex flex-col gap-3">
                <div className="bg-[#8FB062]/15 border border-[#8FB062]/30 rounded-2xl p-3.5 transition-all">
                  <button
                    type="button"
                    id="btn-toggle-caddie-advice"
                    onClick={() => setIsCaddieAdviceOpen(!isCaddieAdviceOpen)}
                    className="w-full flex items-center justify-between gap-2 text-left cursor-pointer group"
                    aria-expanded={isCaddieAdviceOpen}
                  >
                    <div className="text-[10px] font-bold text-[#5A7A3A] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t.caddieAdvice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5A7A3A] group-hover:text-[#1B291A] transition">
                      <span>{isCaddieAdviceOpen ? (lang === 'fr' ? 'Réduire' : 'Collapse') : (lang === 'fr' ? 'Développer' : 'Expand')}</span>
                      {isCaddieAdviceOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                  {isCaddieAdviceOpen && (
                    <p className="text-xs text-[#2C3327] leading-relaxed mt-2 pt-2 border-t border-[#8FB062]/20">
                      {caddieText}
                    </p>
                  )}
                </div>

                {/* Direct Line Elevation Profile Preview */}
                <ElevationProfileChart
                  hole={hole}
                  teePosition={teePosition}
                  targetPosition={targetPosition}
                  pinPosition={pinPosition}
                  onSetTarget={onSetTarget}
                  lang={lang}
                  unitSystem={unitSystem}
                />

                {/* Green Profile Specs & Contour Grid Readout */}
                <div className="bg-[#F1EDE2]/80 border border-[#DED9CC] rounded-2xl p-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#1B291A] flex items-center gap-1.5">
                      <Grid3X3 className="w-3.5 h-3.5 text-[#4B6B2F]" />
                      <span>{t.greenContourTitle}</span>
                    </div>
                    {onInspectGreen && (
                      <button
                        id="btn-inspect-green-contour"
                        onClick={onInspectGreen}
                        className="text-[11px] font-semibold text-[#4B6B2F] hover:text-[#1B291A] flex items-center gap-1 bg-[#E0DBCF]/80 px-2 py-0.5 rounded-lg border border-[#DED9CC] cursor-pointer transition"
                      >
                        <span>{lang === 'fr' ? 'Examiner' : 'Inspect Slope'}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-[#E0DBCF]/60 p-2 rounded-xl border border-[#DED9CC]">
                      <span className="text-[#5C6353] block text-[10px]">
                        {lang === 'fr' ? 'Profondeur :' : 'Depth:'}
                      </span>
                      <span className="font-bold text-[#1B291A] text-xs">
                        {formatDistance(hole.greenDimensions.depthYards, unitSystem)}
                      </span>
                    </div>
                    <div className="bg-[#E0DBCF]/60 p-2 rounded-xl border border-[#DED9CC]">
                      <span className="text-[#5C6353] block text-[10px]">
                        {lang === 'fr' ? 'Largeur :' : 'Width:'}
                      </span>
                      <span className="font-bold text-[#1B291A] text-xs">
                        {formatDistance(hole.greenDimensions.widthYards, unitSystem)}
                      </span>
                    </div>
                    <div className="bg-[#E0DBCF]/60 p-2 rounded-xl border border-[#DED9CC]">
                      <span className="text-[#5C6353] block text-[10px] flex items-center gap-0.5">
                        <TrendingDown className="w-2.5 h-2.5 text-[#A85832]" />
                        {t.slope} :
                      </span>
                      <span className="font-bold text-[#A85832] text-xs">
                        {hole.greenContour?.slopePercent || 2.5}%
                      </span>
                    </div>
                    <div className="bg-[#E0DBCF]/60 p-2 rounded-xl border border-[#DED9CC]">
                      <span className="text-[#5C6353] block text-[10px] flex items-center gap-0.5">
                        <Gauge className="w-2.5 h-2.5 text-[#4B6B2F]" />
                        {t.stimpMeter} :
                      </span>
                      <span className="font-bold text-[#4B6B2F] text-xs">
                        {hole.greenContour?.stimpRating || 12.0}
                      </span>
                    </div>
                  </div>

                  {hole.greenContour && (
                    <div className="bg-white/70 p-2.5 rounded-xl border border-[#DED9CC] text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#5C6353] font-medium">{t.fallLine} :</span>
                        <span className="font-bold text-[#1B291A] text-right">
                          {lang === 'fr' && hole.greenContour.fallLineDirectionFr
                            ? hole.greenContour.fallLineDirectionFr
                            : hole.greenContour.fallLineDirection}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C6353] leading-tight">
                        {lang === 'fr' && hole.greenContour.ridgeDescriptionFr
                          ? hole.greenContour.ridgeDescriptionFr
                          : hole.greenContour.ridgeDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'elevation' && (
              <div className="flex flex-col gap-3">
                <ElevationProfileChart
                  hole={hole}
                  teePosition={teePosition}
                  targetPosition={targetPosition}
                  pinPosition={pinPosition}
                  onSetTarget={onSetTarget}
                  lang={lang}
                  unitSystem={unitSystem}
                />
                <div className="bg-[#8FB062]/15 border border-[#8FB062]/30 rounded-2xl p-3.5 text-xs text-[#2C3327] leading-relaxed">
                  <span className="font-bold text-[#5A7A3A] block mb-1">
                    {lang === 'fr' ? 'Impact de la Pente sur le Coup' : 'Elevation Impact on Shot Planning'}
                  </span>
                  {hole.elevationChangeYards < 0 ? (
                    <span>
                      {lang === 'fr' ? (
                        <>
                          La <strong>descente de {formatDistance(Math.abs(hole.elevationChangeYards), unitSystem)} ({formatFeet(Math.abs(hole.elevationChangeYards * 3), unitSystem)})</strong> réduit la distance effective de carry d’environ <strong>{formatDistance(Math.abs(Math.round(hole.elevationChangeYards * 0.9)), unitSystem)}</strong>. La balle restant plus longtemps en l’air, le vent exerce une déviation accrue.
                        </>
                      ) : (
                        <>
                          The <strong>{Math.abs(hole.elevationChangeYards * 3)} ft downhill plunge</strong> reduces the effective carry distance by approx. <strong>{Math.abs(Math.round(hole.elevationChangeYards * 0.9))} yards</strong>. In calm conditions, expect the ball to hang in the air longer.
                        </>
                      )}
                    </span>
                  ) : hole.elevationChangeYards > 0 ? (
                    <span>
                      {lang === 'fr' ? (
                        <>
                          La <strong>montée de {formatDistance(hole.elevationChangeYards, unitSystem)}</strong> rajoute environ <strong>{formatDistance(Math.round(hole.elevationChangeYards * 0.9), unitSystem)}</strong> à la distance de portée requise. Prenez un club de plus.
                        </>
                      ) : (
                        <>
                          The <strong>{hole.elevationChangeYards * 3} ft uphill climb</strong> adds approx. <strong>{Math.round(hole.elevationChangeYards * 0.9)} yards</strong> to the required carry. Club up accordingly.
                        </>
                      )}
                    </span>
                  ) : (
                    <span>
                      {lang === 'fr'
                        ? 'Ce trou se joue de niveau du départ au green. Concentrez vos ajustements sur le vent et la roule.'
                        : 'This hole plays level from tee to green. Focus adjustments on wind and rollout.'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'hazards' && (
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                {hole.hazards.map((hazard) => (
                  <div
                    key={hazard.id}
                    onClick={() => onFocusHazard?.(hazard)}
                    className="bg-[#F1EDE2]/80 hover:bg-[#EBE7DD] border border-[#DED9CC] p-3 rounded-2xl transition flex items-start justify-between gap-3 cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          hazard.dangerLevel === 'high'
                            ? 'bg-[#A85832]/20 text-[#A85832] border border-[#A85832]/30'
                            : 'bg-[#C2B280]/30 text-[#8B6E30] border border-[#C2B280]/40'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#1B291A] group-hover:text-[#5A7A3A] transition">
                          {lang === 'fr' && hazard.nameFr ? hazard.nameFr : hazard.name}
                        </h5>
                        <p className="text-[11px] text-[#5C6353] mt-0.5 leading-relaxed">
                          {lang === 'fr' && hazard.descriptionFr ? hazard.descriptionFr : hazard.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 border ${
                        hazard.dangerLevel === 'high'
                          ? 'bg-[#A85832]/10 text-[#A85832] border-[#A85832]/30'
                          : 'bg-[#C2B280]/20 text-[#8B6E30] border-[#C2B280]/40'
                      }`}
                    >
                      {hazard.dangerLevel === 'high'
                        ? t.dangerHigh
                        : hazard.dangerLevel === 'medium'
                          ? t.dangerMedium
                          : t.dangerLow}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="flex flex-col gap-2.5">
                <div className="bg-[#C2B280]/20 border border-[#C2B280]/40 rounded-2xl p-3.5">
                  <div className="text-[10px] font-bold text-[#8B6E30] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Histoire & Grands Moments' : 'Historic Championship Lore'}</span>
                  </div>
                  <p className="text-xs text-[#2C3327] leading-relaxed">
                    {historyText}
                  </p>
                </div>
                <div className="text-[11px] text-[#5C6353] p-2.5 bg-[#F1EDE2] rounded-xl border border-[#DED9CC] leading-relaxed">
                  {descriptionText}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
