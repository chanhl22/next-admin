export { withAuth } from "./withAuth";
export { withErrorHandler } from "./withErrorHandler";
export { withLogging } from "./withLogging";
export { withFetchUtils } from "./withFetchUtils";
export { compose } from "./compose";

import { compose } from "./compose";
import { withLogging } from "./withLogging";
import { withErrorHandler } from "./withErrorHandler";
import { withFetchUtils } from "./withFetchUtils";
import { withAuth } from "./withAuth";

/**
 * 인증 필요한 API용 기본 조합
 * - 로깅 → 에러처리 → 안전한 Fetch → 인증
 */
export const withAuthApi = compose(
  withLogging,
  withErrorHandler,
  withFetchUtils,
  withAuth
);

/**
 * 인증 불필요한 API용
 * - 로깅 → 에러처리 → 안전한 Fetch
 */
export const withPublicApi = compose(
  withLogging,
  withErrorHandler,
  withFetchUtils
);