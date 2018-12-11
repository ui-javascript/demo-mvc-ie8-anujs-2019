const formatMessage = message => {
  let lines = message.split('\n');

  // 删除多余的换行符
  if (lines.length > 2 && lines[1] === '') {
    lines.splice(1, 1);
  }

  // 从文件名中删除特定于web包的装入器标记
  lines[0] =
    lines[0].lastIndexOf('!') !== -1
      ? lines[0]
      : lines[0].substr(lines[0].lastIndexOf('!') + 1);

  // webpack 入口文件警告
  lines = lines.filter(line => line.indexOf(' @ ') !== 0);

  return lines.join('\n');
};

const getFormatMessage = isError => message => formatMessage(message, isError);

// 格式化 webpack 错误和警告信息
const formatWebpackMessages = json => ({
  errors: json.errors.map(getFormatMessage(true)),
  warnings: json.warnings.map(getFormatMessage(false)),
});

module.exports = formatWebpackMessages;
