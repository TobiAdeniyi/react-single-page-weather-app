const rankIndex = (target, indexList) => {
  return indexList
    .reduce((newIndex, entry) => {
      const e = entry.name.toLowerCase();
      const t = target.toLowerCase();
      const score = e === t ? 3 : e.startsWith(t) ? 2 : e.includes(t) ? 1 : 0;
      if (score > 0) newIndex.push({ entry, score });
      return newIndex;
    }, [])
    .sort((item1, item2) => {
      // console.log(item1);
      return item1.entry.name
        .toLowerCase()
        .localeCompare(item2.entry.name.toLowerCase());
    }) // alphabetically
    .sort((item1, item2) => item2.score - item1.score) // by score
    .map(({ entry, _ }) => entry);
};

export { rankIndex };
