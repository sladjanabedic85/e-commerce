function CartItem(props) {
    return (
        <div className="flex gap-4 rounded-lg border p-3">
            <img
                src={`/images/${props.id}.png`}
                alt={props.name}
                className="h-28 w-24 shrink-0 rounded-md bg-slate-100 object-cover"
            />

            <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between">
                    <p className="font-semibold">{props.name}</p>
                    <p className="font-semibold">${props.price}</p>
                </div>

                {props.size && <p className="text-sm text-muted-foreground">Size: {props.size}</p>}

                <div className="mt-2 flex items-center gap-4">
                    <div className="flex w-fit items-center overflow-hidden rounded-md bg-neutral-900 text-white">
                        <button
                            type="button"
                            className="px-3 py-1 text-sm"
                            onClick={() => props.onDecrease(props.id)}
                        >
                            -
                        </button>
                        <span className="min-w-6 bg-neutral-700 px-2 text-center text-sm">{props.quantity}</span>
                        <button
                            type="button"
                            className="px-3 py-1 text-sm"
                            onClick={() => props.onIncrease(props.id)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        type="button"
                        className="ml-auto text-sm text-muted-foreground underline"
                        onClick={() => props.onRemove(props.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;