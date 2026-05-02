export type ScalingParams = {
  text: string;
  containerWidth: number;
  containerHeight: number;
  minScale?: number;
};

// Direct calculation - no DOM needed
export const calculateScaleFromContainer = (
  textWidth: number,
  textHeight: number,
  containerWidth: number,
  containerHeight: number,
  minScale: number = 0.5
): number => {
  if (
    textWidth <= 0 ||
    textHeight <= 0 ||
    containerWidth <= 0 ||
    containerHeight <= 0
  ) {
    return 1;
  }

  const widthRatio = containerWidth / textWidth;
  const heightRatio = containerHeight / textHeight;

  // Use smaller ratio so text fits in BOTH dimensions
  const neededScale = Math.min(widthRatio, heightRatio);

  // Only apply minScale when scaling down (neededScale < 1)
  // Don't apply minScale when capping at 1 (text already fits)
  if (neededScale >= 1) {
    return 1; // Text fits, don't scale up
  }

  // Scale is needed and less than 1 - apply minScale floor
  return Math.max(minScale, neededScale);
};

export const calculateOptimalScale = (params: ScalingParams): number => {
  const { text, containerWidth, containerHeight, minScale = 0.5 } = params;

  if (containerWidth <= 0 || containerHeight <= 0) {
    return 1;
  }

  const lines = text.split("\n");
  const isMultiLine = lines.length > 1;

  let low = isMultiLine ? 0.3 : minScale;
  let high = 1;
  let best = isMultiLine ? 0.3 : minScale;

  // Create a temporary element to measure text dimensions
  const measureElement = document.createElement("span");
  measureElement.style.position = "absolute";
  measureElement.style.visibility = "hidden";
  measureElement.style.whiteSpace = "nowrap";
  measureElement.style.fontFamily =
    '"JetBrains Mono", "IBM Plex Mono", "Fira Code", ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace';
  measureElement.style.fontSize = "1em";
  measureElement.textContent = text;
  document.body.appendChild(measureElement);

  const measureWidth = measureElement.scrollWidth;
  const measureHeight = measureElement.scrollHeight;

  document.body.removeChild(measureElement);

  // Binary search for optimal scale that ensures text fits in both dimensions
  for (let index = 0; index < 8; index += 1) {
    const mid = (low + high) / 2;

    const scaledWidth = measureWidth * mid;
    const scaledHeight = measureHeight * mid;

    const fits =
      scaledWidth <= containerWidth &&
      (isMultiLine || scaledHeight <= containerHeight);

    if (fits) {
      best = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  return best;
};

export const getTextDimensions = (
  text: string
): { width: number; height: number } => {
  const measureElement = document.createElement("span");
  measureElement.style.position = "absolute";
  measureElement.style.visibility = "hidden";
  measureElement.style.whiteSpace = "nowrap";
  measureElement.style.fontFamily =
    '"JetBrains Mono", "IBM Plex Mono", "Fira Code", ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace';
  measureElement.style.fontSize = "1em";
  measureElement.textContent = text;
  document.body.appendChild(measureElement);

  const width = measureElement.scrollWidth;
  const height = measureElement.scrollHeight;

  document.body.removeChild(measureElement);

  return { width, height };
};
