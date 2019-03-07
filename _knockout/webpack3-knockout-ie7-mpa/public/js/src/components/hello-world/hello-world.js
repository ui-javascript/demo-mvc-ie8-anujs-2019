function ViewModel(params, componentInfo) {
  this.hello_world = params.hello_world;

  // handle any cleanup such as event listeners or intervals
  // in this.dispose
  this.dispose = function(){
    console.log('hello-world elem disposed');
  };
}

export default ViewModel;
