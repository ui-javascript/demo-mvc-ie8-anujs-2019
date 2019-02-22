import $ from "jquery"
import style from "./styles/index.less"

var _formPay = $('#form_paypsw');

_formPay.validate({
  rules: {
    'payPassword_rsainput': {
      'minlength': 6,
      'maxlength': 6,
      required: true,
      digits: true,
      numPassword: true,
      echoNum: true
    }
  },

  messages: {
    'payPassword_rsainput': {
      'required': '<i class="icon icon-attention icon-lg"></i>&nbsp;请填写支付密码',
      'maxlength': '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最多为{0}个字符',
      'minlength': '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最少为{0}个字符',
      'digits': '<i class="icon icon-attention icon-lg"></i>&nbsp;密码只能为数字',
      'numPassword': '<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）',
      'echoNum': '<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）'
    }
  },
  errorPlacement: function (error, element) {
    element.closest('div[data-error="i_error"]').append(error);
  },
  submitHandler: function (form) {
    var _form = $(form);
    form.submit();

  }
});

var payPassword = $("#payPassword_container"),
  _this = payPassword.find('i'),
  k = 0, j = 0,
  password = '',
  _cardwrap = $('#cardwrap');
//点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
payPassword.on('focus', "input[name='payPassword_rsainput']", function () {

  var _this = payPassword.find('i');
  if (payPassword.attr('data-busy') === '0') {
    //在第一个密码框中添加光标样式
    _this.eq(k).addClass("active");
    _cardwrap.css('visibility', 'visible');
    payPassword.attr('data-busy', '1');
  }

});
//change时去除输入框的高亮，用户再次输入密码时需再次点击
payPassword.on('change', "input[name='payPassword_rsainput']", function () {
  _cardwrap.css('visibility', 'hidden');
  _this.eq(k).removeClass("active");
  payPassword.attr('data-busy', '0');
}).on('blur', "input[name='payPassword_rsainput']", function () {

  _cardwrap.css('visibility', 'hidden');
  _this.eq(k).removeClass("active");
  payPassword.attr('data-busy', '0');

});

//使用keyup事件，绑定键盘上的数字按键和backspace按键
payPassword.on('keyup', "input[name='payPassword_rsainput']", function (e) {

  var e = (e) ? e : window.event;

  //键盘上的数字键按下才可以输入
  if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
    k = this.value.length;//输入框里面的密码长度
    var l = _this.size();//6

    for (; l--;) {

      //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
      if (l === k) {
        _this.eq(l).addClass("active");
        _this.eq(l).find('b').css('visibility', 'hidden');

      } else {
        _this.eq(l).removeClass("active");
        _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');

      }

      if (k === 6) {
        j = 5;
      } else {
        j = k;
      }
      $('#cardwrap').css('left', j * 30 + 'px');

    }
  } else {
    //输入其他字符，直接清空
    var _val = this.value;
    this.value = _val.replace(/\D/g, '');
  }
});
