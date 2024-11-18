import './App.css';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import { closestCorners, DndContext } from '@dnd-kit/core';

function App() {

    
    return (
        <div>
            <DndContext collisionDetection={closestCorners}>
                <KanbanBoard />
            </DndContext>
        </div>
    );
}

export default App;
