import $ from 'jquery'
// 不知道为什么一引入velocity就会报velocity is not a function，网上的方法试过都不行，暂时改回用jquery实现动画吧
// const velocity = require('velocity-animate')

// 标签搜索
const findClosestElement = function(element, className){
  var regex = new RegExp("(^|\\s)"+className+"(\\s|$)", "gi")
  while (!regex.test(element.className)) {
    // Increment the loop to the parent node
    element = element.parentNode;
    if (!element) {
        return null;
    }
  }
  // At this point, the while loop has stopped and `element` represents the element that has
  // the class you specified in the second parameter of the function `clazz`

  // Then return the matched element
  return element;
}

// Box切换
const toggleBoxCollapse = function(box, boxBody, icon) {
  if(box.className.indexOf('collapsed-box') !== -1) {
    icon.className = icon.className.replace(/fa-plus/g, 'fa-minus');
    // $(boxBody).velocity('slideDown', {
    //   duration: 500,
    //   easing: 'easeInSine',
    //   complete: function() {
    //     box.className = box.className.replace(/ collapsed-box/g, '');
    //   }
    // });
    $(boxBody).slideDown(300, function () {
        box.className = box.className.replace(/ collapsed-box/g, '');
    });
  } else {
    icon.className = icon.className.replace(/fa-minus/g, 'fa-plus');
    // $(boxBody).velocity('slideUp', {
    //   duration: 500,
    //   easing: 'easeInSine',
    //   complete: function() {
    //     // box.className = box.className.replace(/ collapsed-box/g, '');
    //     box.className += ' collapsed-box';
    //   }
    // });
    $(boxBody).slideUp(300, function () {
      box.className = box.className.replace(/ collapsed-box/g, '');
      box.className += ' collapsed-box';
    });
  }
}

// 删除Box
const removeBox = function(box) {
  // console.log(box)
  // $(box).velocity('slideUp', {
  //   duration: 500,
  //   easing: 'easeInSine'
  // })
  $(box).slideUp(500);
}

// 先存疑
const initialize = function() {
  function bootstrapTooltips(selector) {
    $('body').tooltip({
      selector: selector
    })
  }
  return {
    bootstrapTooltips: bootstrapTooltips
  }
}

// dropdown切换
const toggleDropdown = (element) => {
  let $ele = $(element)

  $ele.on('click', (event) => {
    event.stopPropagation()

    if ($ele.hasClass('open')) {
      $ele.removeClass('open')
      $ele.find('.dropdown-toggle').attr('aria-expanded', false)
    } else {
      $ele.addClass('open')
      $ele.find('.dropdown-toggle').attr('aria-expanded', true)
    }
  })

  $('body').on('click', () => {
    if ($ele.hasClass('open')) {
      $ele.removeClass('open')
      $ele.find('.dropdown-toggle').attr('aria-expanded', false)
    }
  })
}

export {
  findClosestElement,
  toggleBoxCollapse,
  removeBox,
  initialize,
  toggleDropdown
}
