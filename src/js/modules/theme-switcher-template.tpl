<!--
  https://github.com/GoogleChromeLabs/dark-mode-toggle/
  https://inclusive-components.design/a-theme-switcher/
  https://web.dev/building-a-theme-switch-component/
  https://github.com/argyleink/gui-challenges/tree/main/theme-switch
  https://www.smashingmagazine.com/2024/03/setting-persisting-color-scheme-preferences-css-javascript/
-->
<style>
  *,::after,::before{box-sizing:border-box}:host{contain:content;display:block}form{margin:0;padding:0;background:transparent;color:inherit}fieldset{border:0;margin:0;padding:0}legend{font:var(--${NAME}-legend-font,inherit);padding:0;margin-block-end:0.5rem}input,label{cursor:pointer}

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    pointer-events: none;
    margin: 0;
    border: 0;
    padding: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    white-space: nowrap;
  }

  input:focus:not(:focus-visible) + label { outline: 0; }

  input:focus-visible + label {
    --${NAME}-border-color: var(--accent);
  }

  label {
    display: inline-block;
    position: relative;
    border-width: 1px;
    border-style: solid;
    border-color: var(--${NAME}-border-color, transparent);
    border-radius: 50%;
    padding: 1ch;
    font-size: var(--${NAME}-font-size, 14px);
    line-height: 1;
    /*
    vertical-align: top;
    transition-delay: 0s;
    transition-duration: 300ms;
    transition-property: border-color, filter;
    transition-timing-function: ease-in-out; */
  }

  /*
  label::after {
    content: '';
    display: inline-block;
    background-size: var(--${NAME}-icon-size, 1rem);
    background-repeat: no-repeat;
    width: var(--${NAME}-icon-size, 1rem);
    height: var(--${NAME}-icon-size, 1rem);
    filter: var(--${NAME}-icon-filter, none);
    vertical-align: middle;
    transition: filter 200ms ease-in-out;
  }
  [part="darkLabel"]::after {
    background-image: var(--${NAME}-${DARK}-icon, ${ICON_OUTLINED});
  }
  [part="lightLabel"]::after {
    background-image: var(--${NAME}-${LIGHT}-icon, ${ICON_FILLED});
  }
  [part="toggleLabel"]::after {
    background-image: var(--${NAME}-icon, ${ICON});
  } */

  @media (hover: hover) {
    label:hover::after { filter: brightness(120%); }
  }

  [part="toggleLabel"] > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
  }

  .sun-and-moon > :is(.moon, .sun, .sun-beams) {
    transform-origin: center center;
  }
  .sun-and-moon > :is(.moon, .sun) {
    fill: var(--${NAME}-icon-fill);
  }
  [part="toggleLabel"]:is(:hover, :focus-visible) .sun {
    fill: var(--${NAME}-icon-fill-hover);
  }
  [part="toggleLabel"] .sun-beams {
    stroke: var(--${NAME}-icon-fill);
    stroke-width: 2px;
  }
  [part="toggleLabel"]:is(:hover, :focus-visible) .sun-beams {
    stroke: var(--${NAME}-icon-fill-hover);
  }

  @media (prefers-reduced-motion: no-preference) {
    .sun-and-moon > .sun {
      transition:
        transform
          var(--sun-duration, .5s)
          var(--sun-easing, cubic-bezier(.5, 1.25, .75, 1.25));
      transform: scale(var(--sun-sx, 1));
    }
    .sun-and-moon > .sun-beams {
      opacity: var(--beams-a, 1);
      transform: rotateZ(var(--beams-r, 0));
      transition:
        transform
          var(--beams-duration, .5s)
          cubic-bezier(.5, 1.5, .75, 1.25),
        opacity
          var(--beams-duration, .5s)
          cubic-bezier(.25, 0, .3, 1);
    }
    .sun-and-moon > .moon > circle {
      transform: translateX(var(--moon-tx, 0));
      transition: transform var(--moon-duration, .25s) cubic-bezier(0,0,0,1);
      transition-delay: var(--moon-delay, 0s);

      /* @supports (cx: 1) {
        transform: translateX(0);
        cx: 17;
      } */
    }
  }
</style>
<form part="form">
  <fieldset part="fieldset">
    <legend part="legend">Поменять оформление</legend>
    <input
      part="${LIGHT}Radio"
      id="r1"
      type="radio"
      name="mode"
      value="${LIGHT}"
    />
    <label part="${LIGHT}Label" for="r1" title="Светлое оформление"></label>
    <input
      part="${DARK}Radio"
      id="r2"
      type="radio"
      name="mode"
      value="${DARK}"
    />
    <label part="${DARK}Label" for="r2" title="Тёмное оформление"></label>

    <input part="toggleCheckbox" id="cb" type="checkbox" />
    <label part="toggleLabel" for="cb" title="Поменять оформление">
      <svg
        class="sun-and-moon"
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          class="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </label>
  </fieldset>
</form>
