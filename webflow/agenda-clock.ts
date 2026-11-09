// Entry for the Webflow site: scripts/build-dist.js bundles it into
// dist/webflow/agenda-clock.js. Load it after the agenda, for example in the
// page's footer code, from jsDelivr pinned to a released version.
import { startAgendaClock } from '../components/utils/agenda-clock';

document.querySelectorAll<HTMLElement>('[data-agenda-date]').forEach((list) => startAgendaClock(list));
