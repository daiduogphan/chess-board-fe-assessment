import { useEffect, useState } from "react"
import "./chessBoard.css"
import {
	VERTICAL_AXIS,
	HORIZONTAL_AXIS,
  } from "../utils/AppConstants";

export default function Chessboard() {
	const [ todo, setTodo ] = useState([{id: '', color: ''}]);
	const [ sourceChess, setSourceChess ] = useState<any>('');

	useEffect(() => {
		const listItemsTemp = [];
		var index = 0;
		for (let j = VERTICAL_AXIS.length-1; j>=0; j--) {
			for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
				const text = `${HORIZONTAL_AXIS[i]}${VERTICAL_AXIS[j]}`;
				const color = (Math.random().toString(16)+'00000').slice(2,8);
				let item = {
					id: text,
					color,
				};
				listItemsTemp.push(item);
				index = index+1;
			}
		}
		console.log(listItemsTemp);
		setTodo(listItemsTemp)
    }, []);

	function grabPiece(e: React.MouseEvent) {
		const element = (e.target as HTMLButtonElement).getAttribute('data-mode');
		setSourceChess(element);
	}
	
	function dropPiece(e: React.MouseEvent) {
		const element = (e.target as HTMLButtonElement).getAttribute('data-mode');
		if(sourceChess && sourceChess !==element) {
			//Find index source chess and destination 
			var indexSource:any = null;
			var indexDestination:any = null;
			for (let index in todo) {
				if (!indexSource || !indexDestination) {
					if (todo[index].id === sourceChess) {
						indexSource = index;
					} else if (todo[index].id === element) {
						indexDestination = index;
					}
				} else {
					setSourceChess('');
					break;
				}
			}
			const newTodo = [...todo];
			var temp = { ...newTodo[indexSource] };
			newTodo[indexSource] = newTodo[indexDestination];
			newTodo[indexDestination] = temp;
			setTodo(newTodo);
		}
	}
	
	return (
		<div className='grabbable chessboard'>
			{todo.map(({ id, color }, index) => {
				return (
					<div
						id='tile'
						data-mode={id}
						style={{background: `#${color}`}}
						onMouseDown={(e) => grabPiece(e)}
						onMouseUp={(e) => dropPiece(e)}
					>
					</div>
				)
			})}
		</div>
	)
}
