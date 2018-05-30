javascript: function webClip() {
  let props = {};

  // Default values
  props.pageTitle = document.title ? document.title : 'No Title';
  props.pageSummary = 'No Summary';
  props.pageUrl = location.href;

  const metas = document.getElementsByTagName('meta');

  // If meta tags
  if (metas.title) {
    props.pageTitle = metas.title.content;
  }
  if (metas.description) {
    props.pageSummary = metas.description.content;
  }
  if (document.querySelector('link[rel="canonical"]')) {
    props.pageUrl = document.querySelector('link[rel="canonical"]').href;
  }

  // If Open Graph tags  
  let ogProps = {};
  const metaTags = Array.from(metas);
  metaTags.filter(tag => tag.hasAttribute('property') && tag.hasAttribute('content'))
    .map((tag) => {
      if (tag.attributes.property.value === 'og:title' || tag.attributes.property.value === 'og:description' || tag.attributes.property.value === 'og:url') {
        ogProps[tag.attributes.property.value] = tag.attributes.content.value;
      }
    });

  if (ogProps['og:title']) {
    props.pageTitle = ogProps['og:title'];
  }
  if (ogProps['og:description']) {
    props.pageSummary = ogProps['og:description'];
  }
  if (ogProps['og:url']) {
    props.pageUrl = ogProps['og:url'];
  }

  const clip = {
    title: props.pageTitle,
    summary: props.pageSummary,
    url: props.pageUrl,
    date: Date.now()
  };

  console.log(clip);
}
webClip();