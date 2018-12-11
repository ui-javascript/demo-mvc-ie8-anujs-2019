'use strict';

import * as ko   from 'knockout';
// CSS is appeneded to <head> as <style>
import                './hello-world.scss';
// HTML will be the template string
import HTML      from './hello-world.html';
import ViewModel from './hello-world';


(function init(){
  ko.components.register('hello-world', {
    viewModel: { 
      createViewModel: function(params, component){
        return new ViewModel(params, component);    
      } 
    },
    template: HTML
  });
})();