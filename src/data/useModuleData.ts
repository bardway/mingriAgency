import { useMemo } from 'react';
import { buildSampleCampaign, buildSampleCharacter, buildSampleClue, buildSampleScene } from './modules/samples';

/**
 * Hook to access module template/sample data builders.
 * These can later be swapped to remote-loaded module definitions.
 */
export function useModuleData() {
  return useMemo(
    () => ({
      createSampleCharacter: buildSampleCharacter,
      createSampleCampaign: buildSampleCampaign,
      createSampleScene: buildSampleScene,
      createSampleClue: buildSampleClue,
    }),
    [],
  );
}
