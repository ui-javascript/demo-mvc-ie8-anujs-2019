import * as ko from 'knockout';
import * as marked from 'marked';

function ViewModel(params, componentInfo) {
  this.markdown = ko.observable(params.markdown);

  function markedHtml(){
    return marked( this.markdown() );
  }

  this.markedHtml = ko.pureComputed(markedHtml.bind(this));
  
}

export default ViewModel;
