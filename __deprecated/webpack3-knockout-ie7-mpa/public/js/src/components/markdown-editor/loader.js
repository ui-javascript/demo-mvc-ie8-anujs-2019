'use strict';

import * as ko   from 'knockout';
// CSS is appeneded to <head> as <style>
import                './markdown-editor.scss';
// HTML will be the template string
import HTML      from './markdown-editor.html';
import ViewModel from './markdown-editor';


(function init(){
  ko.components.register('markdown-editor', {
    viewModel: { 
      createViewModel: function(params, component){
        return new ViewModel(params, component);    
      } 
    },
    template: HTML
  });
})();