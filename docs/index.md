---
layout: home
hero:
   name: input-validation-next
   tagline: Form validation without jQuery.
   image:
      src: /images/logo.png
      alt: input-validation-next logo
   actions:
      - theme: brand
        text: Get Started
        link: /guide
features:
   - title: Low build size
     details: Total bundle weigths about ~12kb
   - title: Built-in input validators
     details: phone, email, date, url, ...
   - title: User type checking
     details: Full type checking of the values, coming from the user in browser (config, functions params)
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.main {
	min-height: 300px;
}

.clip {
	font-size: 53px;
}

.VPHero.has-image {
	margin-top: 0;
	margin-bottom: 50px;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
