/* eslint-disable */
export default $ => {
  let MMPaginator = function(element, options) {
    this.$el = $(element);
    this.opts = options;
  };

  MMPaginator.prototype = {
    _initLayout: function() {
      let that = this;
      let $el = this.$el;
      let opts = this.opts;

      $el.addClass('mmPaginator');
      let pgHtmls = [
        '<div class="totalCountLabel"></div>',
        '<ul class="pageList"></ul>',
        '<div class="limit"><select></select></div>',
      ];
      $el.append($(pgHtmls.join('')));

      this.$totalCountLabel = $el.find('.totalCountLabel');
      this.$pageList = $el.find('.pageList');
      this.$limitList = $el.find('.limit select');

      let $limitList = this.$limitList;
      $.each(opts.limitList, function() {
        let $option = $('<option></option>')
          .prop('value', this)
          .text(that.formatString(opts.limitLabel, [this]));
        $limitList.append($option);
      });

      $limitList.on('change', function() {
        $el.data('page', 1);
        if (opts.onChange) {
          // that.$mmGrid._showLoading();
          opts.onChange(1, parseInt($limitList.val()));
        } else {
          that.$mmGrid.load();
        }
      });
    },

    _plain: function(page, totalCount, limit) {
      let that = this;
      let $el = this.$el;
      let $pageList = this.$pageList;
      let $limitList = this.$limitList;
      let opts = this.opts;

      let totalPage =
        totalCount % limit === 0
          ? parseInt(totalCount / limit)
          : parseInt(totalCount / limit) + 1;
      totalPage = totalPage ? totalPage : 0;
      if (totalPage === 0) {
        page = 1;
      } else if (page > totalPage) {
        page = totalPage;
      } else if (page < 1 && totalPage !== 0) {
        page = 1;
      }
      //
      let $prev = $('<li class="prev"><a>«</a></li>');
      if (page <= 1) {
        $prev.addClass('disable');
      } else {
        $prev.find('a').on('click', function() {
          $el.data('page', page - 1);

          if (opts.onChange) {
            // that.$mmGrid._showLoading();
            opts.onChange(page - 1, parseInt($limitList.val()));
          } else {
            that.$mmGrid.load();
          }
        });
      }
      $pageList.append($prev);
      /////
      let list = [1];
      if (page > 4) {
        list.push('...');
      }
      for (let i = 0; i < 5; i++) {
        let no = page - 2 + i;
        if (no > 1 && no <= totalPage - 1) {
          list.push(no);
        }
      }
      if (page + 1 < totalPage - 1) {
        list.push('...');
      }
      if (totalPage > 1) {
        list.push(totalPage);
      }
      $.each(list, function(index, item) {
        let $li = $('<li><a></a></li>');
        if (item === '...') {
          $li.addClass('').html('...');
        } else if (item === page) {
          $li
            .addClass('active')
            .find('a')
            .text(item);
        } else {
          $li
            .find('a')
            .text(item)
            .prop('title', '第' + item + '页')
            .on('click', function() {
              $el.data('page', item);

              if (opts.onChange) {
                // that.$mmGrid._showLoading();
                opts.onChange(item, parseInt($limitList.val()));
              } else {
                that.$mmGrid.load();
              }
            });
        }
        $pageList.append($li);
      });
      //
      let $next = $('<li class="next"><a title="下一页">»</a></li>');
      if (page >= totalPage) {
        $next.addClass('disable');
      } else {
        $next.find('a').on('click', function() {
          $el.data('page', page + 1);

          if (opts.onChange) {
            // that.$mmGrid._showLoading();
            opts.onChange(page + 1, parseInt($limitList.val()));
          } else {
            that.$mmGrid.load();
          }
        });
      }
      $pageList.append($next);
    },

    _search: function() {},

    load: function(params) {
      let $el = this.$el;
      let $limitList = this.$limitList;
      let opts = this.opts;

      if (!params) {
        params = {};
      }

      let page = params[opts.pageParamName];
      if (page === undefined || page === null) {
        page = $el.data('page');
      }
      $el.data('page', page);

      let totalCount = params[opts.totalCountName];
      if (totalCount === undefined) {
        totalCount = 0;
      }
      $el.data('totalCount', totalCount);

      let limit = params[opts.limitParamName];
      if (!limit) {
        limit = $limitList.val();
      }
      this.$limitList.val(limit);

      this.$totalCountLabel.html(
        this.formatString(opts.totalCountLabel, [totalCount])
      );
      this.$pageList.empty();

      this._plain(page, totalCount, this.$limitList.val());
    },

    formatString: function(text, args) {
      return text.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    },

    params: function() {
      let opts = this.opts;
      let $el = this.$el;
      let $limitList = this.$limitList;

      let params = {};
      params[opts.pageParamName] = $el.data('page');
      params[opts.limitParamName] = $limitList.val();
      return params;
    },

    init: function($grid) {
      let that = this;
      let opts = that.opts;
      this.$mmGrid = $grid;
      this._initLayout();

      if (opts.local) {
        this.$mmGrid.on('loadSuccess', (e, data) => {
          // 2018-9-11 汤国栋 新增 config 参数，暂时用来传递当前页码参数。
          if (data.config) {
            if (data.config.currentPage) {
              data[opts.pageParamName] = data.config.currentPage;
            }
            if (data.config.total) {
              data[opts.totalCountName] = data.config.total;
            }
          }

          this.load(data);
        });

        let params = {};
        params[opts.totalCountName] = opts.totalCount;
        params[opts.pageParamName] = opts.page;
        params[opts.limitParamName] = opts.limit;
        this.load(params);
      } else {
        this.$mmGrid.on('loadSuccess', function(e, data) {
          // 2018-9-11 汤国栋 新增 config 参数，暂时用来传递当前页码参数。
          if (data.config) {
            if (data.config.currentPage) {
              data[opts.pageParamName] = data.config.currentPage;
            }
            if (data.config.total) {
              data[opts.totalCountName] = data.config.total;
            }
          }

          that.load(data);
        });

        let params = {};
        params[opts.totalCountName] = 0;
        params[opts.pageParamName] = opts.page;
        params[opts.limitParamName] = opts.limit;
        this.load(params);
      }

      if ($grid.opts.indexCol) {
        let indexCol = $grid.opts.cols[0];
        indexCol.renderer = function(val, item, rowIndex) {
          let params1 = that.params();
          return (
            '<label class="mmg-index">' +
            (rowIndex +
              1 +
              (params1[opts.pageParamName] - 1) *
                params1[opts.limitParamName]) +
            '</label>'
          );
        };
      }
    },
  };

  $.fn.mmPaginator = function() {
    if (arguments.length === 0 || typeof arguments[0] === 'object') {
      let option = arguments[0],
        data = this.data('mmPaginator'),
        options = $.extend(true, {}, $.fn.mmPaginator.defaults, option);
      if (!data) {
        data = new MMPaginator(this[0], options);
        this.data('mmPaginator', data);
      }
      return $.extend(true, this, data);
    }
    if (typeof arguments[0] === 'string') {
      let data = this.data('mmPaginator');
      let fn = data[arguments[0]];
      if (fn) {
        let args = Array.prototype.slice.call(arguments);
        return fn.apply(data, args.slice(1));
      }
    }
  };

  $.fn.mmPaginator.defaults = {
    style: 'plain',
    totalCountName: 'totalCount',
    page: 1,
    pageParamName: 'page',
    limitParamName: 'limit',
    limitLabel: '每页{0}条',
    totalCountLabel: '共 <span>{0}</span> 条记录',
    limit: undefined,
    limitList: [20, 30, 40, 50],
    local: false, // 2018-9-10 汤国栋 新增参数：用来表示是本地数据，分页采用本地方式。
    // onChange: () => {}, // 2018-9-10 汤国栋 新增参数：当前页后每页显示数量变化时触发方法。
  };

  $.fn.mmPaginator.Constructor = MMPaginator;
};
/* eslint-enable */
