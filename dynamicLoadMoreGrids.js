export class DynamicLoadMoreGrids {
  constructor(grids, gridSettings, gridItemCount) {
    this.grids = grids;
    this.gridSettings = gridSettings;
    this.gridItemCount = gridItemCount;
    this.gridObj = {};
  }

  settings = (button) => ({ button, ...this.gridSettings });

  initializeGrid = (obj, list, button) => {
    obj = new FsLibrary(list);
    obj.loadmore(settings(button));
  };

  getElements = (listClass) =>
    document.getElementsByClassName(listClass.replace('.', ''));

  shouldGenerateGrid = (list, itemCount) => {
    const elements = getElements(list);
    return (
      elements &&
      elements[0] &&
      elements[0].childElementCount >= this.gridItemCount
    );
  };

  generate = () => {
    for (const grid of this.grids) {
      const { list, button } = grid;
      if (shouldGenerateGrid(list)) {
        this.gridObj[list] = initializeGrid(this.gridObj[list], list, button);
      }
    }
  };
}
