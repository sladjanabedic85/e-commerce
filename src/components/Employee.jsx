import React from "react";
import { Button } from "./ui/button";

class Employee extends React.Component {
  render() {
    const { name, position, description, image } = this.props;

    return (
      <div className="flex flex-col gap-4">
        <img src={image} alt={name} className="aspect-3/4 w-full rounded-lg object-cover" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button className="w-fit rounded-full">Contact</Button>
      </div>
    );
  }
}

export default Employee;
