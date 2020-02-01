export const getSlug = (name) => {
    return `@${name.split(" ").join("_").toLowerCase()}`;
  }

