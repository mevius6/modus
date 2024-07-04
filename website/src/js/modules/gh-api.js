import { asyncFetchJSON } from "../utils.js";

/**
 * GitHub REST API
 *
 * See:
 * - https://docs.github.com/rest
 * - https://docs.github.com/rest/repos
 * - https://docs.github.com/rest/meta
 * - https://docs.github.com/ru/rest/search/ 😈
 * - https://github.com/octokit/octokit.js/#readme
 * - https://css-tricks.com/using-fetch/
 * - https://curl.se/download.html
 *
 * ```
 * $ curl https://api.github.com/zen
 * $ curl https://api.github.com/emojis
 * ```
 */
const gh = {},
  {
    hostname: GH_API_HOST = 'api.github.com',
    username: GH_USER = 'mevius6',
    repo: GH_REPO = 'modus',
  } = gh;

// https://www.smashingmagazine.com/2022/09/javascript-api-guide/
// https://datatracker.ietf.org/doc/html/rfc6570
export const getRepo = async () => {
  // if (document.visibilityState === 'visible') {
    try {
      const request = await asyncFetchJSON(
        `https://${GH_API_HOST}/users/${GH_USER}/repos?sort=pushed`
      ).then((data) => data.filter((e) => e.name === GH_REPO)[0]);

      const {
        name,
        full_name,
        owner: { login, avatar_url },
        languages_url,
        contents_url,
        labels_url,
        deployments_url,
        created_at,
        updated_at,
        pushed_at,
        svn_url,
        homepage, //= canonical
        size = 0,
        visibility,
        default_branch = 'main',
      } = await request;

      /* sugar bool */
      if (name === GH_REPO) {
        // let upd = new Date(updated_at),
        //   _l10n = upd.toLocaleDateString(undefined, {…});
        // repo_upd.textContent = _l10n;
        let tagCloud = document.querySelector('ul.tag-cloud');
        let langTags = tagCloud.querySelectorAll('li > .tag');
        tagCloud.normalize();
        langTags.forEach((el) => el.normalize());

        // https://www.w3.org/TR/selectors-4/#data-model
        const getLangs = await asyncFetchJSON(languages_url)
          // .then((data) => console.table(data))
          .then((data) => {
            let nodes = langTags,
              { length: total } = nodes;
            // https://dom.spec.whatwg.org/#concept-element-is-value
            let chain; // when null/undefined, passes through (itself)

            Object.keys(data).map((key, i) => {
              chain = nodes?.item(i); // ("optional chaining") element
              total >= i + 1 // if element’s is value is non-null, then:
                ? (nodes.item(i).textContent = key)
                : chain ?? // else if is val null ("nullish coalescing")
                  (tagCloud.appendChild(
                    nodes.item(0).parentNode.cloneNode(true)
                  ).firstChild.textContent = key);
            });
          });
      }

      const {
        url: deployment_url,
        task,
        original_environment: deployment_env,
        created_at: deployment_created,
        updated_at: deployment_updated,
        statuses_url,
        creator: { login: deployment_creator, type },
      } = await asyncFetchJSON(deployments_url).then((data) => data[0]);

      const {
        state,
        description: status_desc,
        environment: status_env,
        target_url,
      } = await asyncFetchJSON(statuses_url).then((data) => data[0]);

      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const timeOptions = {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      };

      repo_upd.textContent = `${deployment_env}: ${status_desc}
      on ${new Date(deployment_updated).toLocaleString('en-US', {
        ...timeOptions,
        ...dateOptions,
      })} by ${deployment_creator}`;
    } catch (error) {
      console.error(error);
    }
  // }
};

// const { onload } = window;
// onload = async (ev) => await getRepo();
