console.log('Hello!!! I am Typescript')

interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
}

function area(shape: Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}

console.log(area({name: "rectangle", width: 30, height: 15}));
console.log(area({name: "square", width: 30, height: 30, color: "blue"}));
