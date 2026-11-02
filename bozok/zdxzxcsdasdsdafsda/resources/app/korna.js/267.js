function n(e, t) {
  this._cells = [];
  this._cellSize = t;
  e.forEach(function (e) {
    var t = this.point2CellXY(e);
    var n = t[0];
    var r = t[1];
    if (this._cells[n] === undefined) {
      this._cells[n] = [];
    }
    if (this._cells[n][r] === undefined) {
      this._cells[n][r] = [];
    }
    this._cells[n][r].push(e);
  }, this);
}
n.prototype = {
  cellPoints: function (e, t) {
    if (this._cells[e] !== undefined && this._cells[e][t] !== undefined) {
      return this._cells[e][t];
    } else {
      return [];
    }
  },
  rangePoints: function (e) {
    var t = this.point2CellXY([e[0], e[1]]);
    for (var n = this.point2CellXY([e[2], e[3]]), r = [], i = t[0]; i <= n[0]; i++) {
      for (var s = t[1]; s <= n[1]; s++) {
        r = r.concat(this.cellPoints(i, s));
      }
    }
    return r;
  },
  removePoint: function (e) {
    var t;
    var n = this.point2CellXY(e);
    for (var r = this._cells[n[0]][n[1]], i = 0; i < r.length; i++) {
      if (r[i][0] === e[0] && r[i][1] === e[1]) {
        t = i;
        break;
      }
    }
    r.splice(t, 1);
    return r;
  },
  point2CellXY: function (e) {
    return [parseInt(e[0] / this._cellSize), parseInt(e[1] / this._cellSize)];
  },
  extendBbox: function (e, t) {
    return [e[0] - t * this._cellSize, e[1] - t * this._cellSize, e[2] + t * this._cellSize, e[3] + t * this._cellSize];
  }
};
module.exports = function (e, t) {
  return new n(e, t);
};