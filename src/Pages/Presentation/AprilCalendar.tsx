import { useEffect, useRef, useState } from "react";
import logo from '../../Assets/Logo/loguito.svg';
import './_proposalroga.scss';
import './_aprilcalendar.scss';

// ── Types ──────────────────────────────────────────────────────────
interface TeamMember {
    name: string;
    role: string;
    color: string;
    emoji: string;
}

interface Brand {
    name: string;
    short: string;
    color: string;
}

interface Task {
    id: string;
    day: number;
    person: string;
    brand: string;
    title: string;
    completed: boolean;
}

type StatusFilter = 'all' | 'in-progress' | 'completed';
type SelectedTask = Task | null;

// ── Data ───────────────────────────────────────────────────────────
const TEAM: TeamMember[] = [
    { name: "Isabela",   role: "Analytics, SEO & Copywriting",    color: "#FF6B6B", emoji: "😊" },
    { name: "Jhon",      role: "Frontend Developer",              color: "#4ECDC4", emoji: "😎" },
    { name: "Kayla",     role: "Marketing, Email & Social Media", color: "#FFD93D", emoji: "🌸" },
    { name: "Claire",    role: "Marketing, Email & Social Media", color: "#A78BFA", emoji: "✨" },
    { name: "Stephanie", role: "UX/UI & Marketing",               color: "#FF8ED4", emoji: "😸" },
];

const BRANDS: Brand[] = [
    { name: "New Image Labs", short: "NIL", color: "#3B82F6" },
    { name: "Onrite",         short: "OR",  color: "#22C55E" },
    { name: "Progen",         short: "PG",  color: "#D4A574" },
    { name: "TressAllure",    short: "TA",  color: "#EC4899" },
    { name: "Hairloss.com",   short: "HL",  color: "#8B5CF6" },
];

const INITIAL_TASKS: Task[] = [
    { id: "s1", day: 3, person: "Stephanie", brand: "Progen",         title: "Fiberbond Page",                         completed: false },
    { id: "s2", day: 3, person: "Stephanie", brand: "New Image Labs", title: "Final Sale Page",                        completed: false },
    { id: "s3", day: 3, person: "Stephanie", brand: "Onrite",         title: "Account + Adjustments",                  completed: false },
    { id: "s4", day: 3, person: "Stephanie", brand: "New Image Labs", title: "Flyer",                                  completed: false },
];

// ── Helpers ────────────────────────────────────────────────────────
const memberColor = (name: string) => TEAM.find(m => m.name === name)?.color ?? "#888";
const memberEmoji = (name: string) => TEAM.find(m => m.name === name)?.emoji ?? "";
const brandColor  = (name: string) => BRANDS.find(b => b.name === name)?.color ?? "#888";
const brandShort  = (name: string) => BRANDS.find(b => b.name === name)?.short ?? name;

/** Build a 6×7 grid (rows × cols, Mon–Sun) for April 2026. 0 = empty cell. */
const buildCalendarGrid = (): number[][] => {
    // April 2026: day 1 is what weekday?
    const firstDow = new Date(2026, 3, 1).getDay(); // 0=Sun … 6=Sat
    // Convert to Mon-start: Mon=0 … Sun=6
    const startOffset = firstDow === 0 ? 6 : firstDow - 1;
    const daysInMonth = 30;
    const rows: number[][] = [];
    let day = 1;
    for (let r = 0; r < 6; r++) {
        const row: number[] = [];
        for (let c = 0; c < 7; c++) {
            const idx = r * 7 + c;
            if (idx < startOffset || day > daysInMonth) {
                row.push(0);
            } else {
                row.push(day++);
            }
        }
        rows.push(row);
        if (day > daysInMonth) break;
    }
    return rows;
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarGrid = buildCalendarGrid();

let nextId = 100;

// ── Component ──────────────────────────────────────────────────────
const AprilCalendar = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<SelectedTask>(null);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    // Move-task state
    const [movingTaskId, setMovingTaskId] = useState<string | null>(null);

    // Form state
    const [formDay, setFormDay] = useState(1);
    const [formPerson, setFormPerson] = useState(TEAM[0].name);
    const [formBrand, setFormBrand] = useState(BRANDS[0].name);
    const [formTitle, setFormTitle] = useState("");

    // ── Intersection observer for scroll-in animations ─────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = (entry.target as HTMLElement).dataset.sectionId;
                    if (!id) return;
                    setVisibleSections(prev => {
                        const next = new Set(prev);
                        entry.isIntersecting ? next.add(id) : next.delete(id);
                        return next;
                    });
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // ── Task CRUD ──────────────────────────────────────────────
    const addTask = () => {
        if (!formTitle.trim()) return;
        setTasks(prev => [
            ...prev,
            { id: `u${nextId++}`, day: formDay, person: formPerson, brand: formBrand, title: formTitle.trim(), completed: false },
        ]);
        setFormTitle("");
    };

    const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

    const toggleComplete = (id: string) =>
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    const moveTask = (id: string, newDay: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, day: newDay } : t));
        setMovingTaskId(null);
    };

    // ── Filtering ──────────────────────────────────────────────
    const filteredTasks = tasks.filter(t => {
        if (selectedPerson && t.person !== selectedPerson) return false;
        if (selectedBrand && t.brand !== selectedBrand) return false;
        if (statusFilter === 'in-progress' && t.completed) return false;
        if (statusFilter === 'completed' && !t.completed) return false;
        return true;
    });

    const tasksForDay = (day: number) => filteredTasks.filter(t => t.day === day);

    // ── Render ─────────────────────────────────────────────────
    return (
        <>
        <div className="april-calendar-page">
        <div className="proposal april-cal">
            <div className="proposal__container">
                {/* Logo */}
                <div className="proposal__logo">
                    <img className="proposal__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                {/* Hero */}
                <div className="april-cal__hero-compact">
                    <h1 className="april-cal__title">April Marketing Team</h1>
                    <span className="april-cal__hero-sub">Task Overview</span>
                </div>

                {/* ── Team Members Bar ───────────────────────── */}
                <section
                    className={`april-cal__section ${visibleSections.has('team') ? 'april-cal__section--visible' : ''}`}
                    data-section-id="team"
                    ref={el => (sectionRefs.current['team'] = el)}
                >
                    <h4 className="proposal__section-subheading">Team</h4>
                    <div className="april-cal__chips">
                        <button
                            className={`april-cal__chip ${selectedPerson === null ? 'april-cal__chip--active' : ''}`}
                            style={selectedPerson === null ? { background: '#49D3BA', color: '#fff', borderColor: '#49D3BA' } : {}}
                            onClick={() => setSelectedPerson(null)}
                        >
                            All
                        </button>
                        {TEAM.map(m => {
                            const active = selectedPerson === m.name;
                            return (
                                <button
                                    key={m.name}
                                    className={`april-cal__chip ${active ? 'april-cal__chip--active' : ''}`}
                                    style={active
                                        ? { background: m.color, color: '#fff', borderColor: m.color }
                                        : { borderColor: m.color }}
                                    onClick={() => setSelectedPerson(prev => prev === m.name ? null : m.name)}
                                >
                                    <span className="april-cal__chip-emoji">{m.emoji}</span>
                                    <span className="april-cal__chip-info">
                                        <span className="april-cal__chip-name">{m.name}</span>
                                        <span className="april-cal__chip-role">{m.role}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ── Status Filter + Brand Legend row ───────── */}
                <section
                    className={`april-cal__section ${visibleSections.has('filters') ? 'april-cal__section--visible' : ''}`}
                    data-section-id="filters"
                    ref={el => (sectionRefs.current['filters'] = el)}
                >
                    <div className="april-cal__filter-row">
                        {/* Status filter */}
                        <div className="april-cal__status-filters">
                            <h4 className="proposal__section-subheading">Status</h4>
                            <div className="april-cal__status-btns">
                                {([['all', 'All'], ['in-progress', 'In Progress'], ['completed', 'Completed']] as [StatusFilter, string][]).map(([val, label]) => (
                                    <button
                                        key={val}
                                        className={`april-cal__status-btn ${statusFilter === val ? 'april-cal__status-btn--active' : ''}`}
                                        onClick={() => setStatusFilter(val)}
                                    >
                                        {val === 'completed' && <span className="april-cal__status-check">✓</span>}
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brand legend */}
                        <div className="april-cal__brand-legend">
                            <h4 className="proposal__section-subheading">Brands</h4>
                            <div className="april-cal__brands">
                                <button
                                    className={`april-cal__brand-tag april-cal__brand-tag--btn ${selectedBrand === null ? 'april-cal__brand-tag--all-active' : ''}`}
                                    onClick={() => setSelectedBrand(null)}
                                >
                                    All
                                </button>
                                {BRANDS.map(b => (
                                    <button
                                        key={b.name}
                                        className={`april-cal__brand-tag april-cal__brand-tag--btn ${selectedBrand === b.name ? 'april-cal__brand-tag--active' : ''}`}
                                        style={{
                                            background: selectedBrand === b.name ? b.color : 'transparent',
                                            borderColor: b.color,
                                            color: selectedBrand === b.name ? '#fff' : b.color,
                                        }}
                                        onClick={() => setSelectedBrand(prev => prev === b.name ? null : b.name)}
                                    >
                                        {b.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Add Task Form ─────────────────────────── */}
                <section
                    className={`april-cal__section ${visibleSections.has('add-task') ? 'april-cal__section--visible' : ''}`}
                    data-section-id="add-task"
                    ref={el => (sectionRefs.current['add-task'] = el)}
                >
                    <h4 className="proposal__section-subheading">Add Task</h4>
                    <div className="april-cal__form">
                        <div className="april-cal__form-field">
                            <label className="april-cal__form-label">Day</label>
                            <select className="april-cal__form-select" value={formDay} onChange={e => setFormDay(Number(e.target.value))}>
                                {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                                    const weekday = new Date(2026, 3, d).toLocaleDateString('en-US', { weekday: 'long' });
                                    return <option key={d} value={d}>{weekday}, April {d}</option>;
                                })}
                            </select>
                        </div>

                        <div className="april-cal__form-field">
                            <label className="april-cal__form-label">Person</label>
                            <select className="april-cal__form-select" value={formPerson} onChange={e => setFormPerson(e.target.value)}>
                                {TEAM.map(m => (
                                    <option key={m.name} value={m.name}>{m.emoji} {m.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="april-cal__form-field">
                            <label className="april-cal__form-label">Brand</label>
                            <select className="april-cal__form-select" value={formBrand} onChange={e => setFormBrand(e.target.value)}>
                                {BRANDS.map(b => (
                                    <option key={b.name} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="april-cal__form-field april-cal__form-field--grow">
                            <label className="april-cal__form-label">Task</label>
                            <input
                                className="april-cal__form-input"
                                type="text"
                                placeholder="What am I working on?"
                                value={formTitle}
                                onChange={e => setFormTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addTask()}
                            />
                        </div>

                        <button className="april-cal__form-btn" onClick={addTask} disabled={!formTitle.trim()}>
                            + Add
                        </button>
                    </div>
                </section>

                {/* ── Calendar Grid ─────────────────────────── */}
                <section
                    className={`april-cal__section ${visibleSections.has('calendar') ? 'april-cal__section--visible' : ''}`}
                    data-section-id="calendar"
                    ref={el => (sectionRefs.current['calendar'] = el)}
                >
                    <h4 className="proposal__section-subheading">April 2026</h4>

                    {/* Desktop grid */}
                    <div className="april-cal__grid">
                        {/* Day-of-week headers */}
                        {DAY_LABELS.map(d => (
                            <div key={d} className="april-cal__grid-header">{d}</div>
                        ))}

                        {/* Day cells */}
                        {calendarGrid.flat().map((day, i) => {
                            const dayTasks = day > 0 ? tasksForDay(day) : [];
                            const isEmpty = day === 0;
                            return (
                                <div
                                    key={i}
                                    className={`april-cal__cell ${isEmpty ? 'april-cal__cell--empty' : ''} ${day > 0 && dayTasks.length === 0 ? 'april-cal__cell--no-tasks' : ''}`}
                                >
                                    {day > 0 && <span className="april-cal__cell-day">{day}</span>}
                                    {dayTasks.map(t => (
                                        <TaskCard
                                            key={t.id}
                                            task={t}
                                            onToggle={toggleComplete}
                                            onDelete={deleteTask}
                                            movingTaskId={movingTaskId}
                                            onMoveStart={setMovingTaskId}
                                            onMove={moveTask}
                                            onOpenPopup={setSelectedTask}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile list */}
                    <div className="april-cal__list">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                            const dayTasks = tasksForDay(day);
                            if (dayTasks.length === 0) return null;
                            const dateObj = new Date(2026, 3, day);
                            const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                            return (
                                <div key={day} className="april-cal__list-day">
                                    <div className="april-cal__list-day-header">
                                        <span className="april-cal__list-day-num">{day}</span>
                                        <span className="april-cal__list-day-name">{weekday}</span>
                                    </div>
                                    {dayTasks.map(t => (
                                        <TaskCard
                                            key={t.id}
                                            task={t}
                                            onToggle={toggleComplete}
                                            onDelete={deleteTask}
                                            movingTaskId={movingTaskId}
                                            onMoveStart={setMovingTaskId}
                                            onMove={moveTask}
                                            onOpenPopup={setSelectedTask}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </div>
        </div>

        {/* Task detail popup */}
        {selectedTask && (
            <div className="april-cal__popup-overlay" onClick={() => setSelectedTask(null)}>
                <div className="april-cal__popup" onClick={e => e.stopPropagation()}>
                    <button className="april-cal__popup-close" onClick={() => setSelectedTask(null)}>✕</button>
                    <span
                        className="april-cal__popup-brand"
                        style={{ background: brandColor(selectedTask.brand) }}
                    >
                        {selectedTask.brand}
                    </span>
                    <h2 className="april-cal__popup-title">{selectedTask.title}</h2>
                    <div className="april-cal__popup-meta">
                        <span className="april-cal__popup-person">
                            {memberEmoji(selectedTask.person)} {selectedTask.person}
                        </span>
                        <span className="april-cal__popup-day">April {selectedTask.day}</span>
                        <span
                            className={`april-cal__popup-status ${selectedTask.completed ? 'april-cal__popup-status--done' : ''}`}
                        >
                            {selectedTask.completed ? '✓ Completed' : '● In Progress'}
                        </span>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

// ── Task Card sub-component ────────────────────────────────────────
interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    movingTaskId: string | null;
    onMoveStart: (id: string | null) => void;
    onMove: (id: string, newDay: number) => void;
    onOpenPopup: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onDelete, movingTaskId, onMoveStart, onMove, onOpenPopup }: TaskCardProps) => {
    const isMoving = movingTaskId === task.id;

    return (
        <div
            className={`april-cal__task ${task.completed ? 'april-cal__task--done' : ''}`}
            style={{ borderLeftColor: memberColor(task.person) }}
            onClick={() => onOpenPopup(task)}
        >
            {/* Checkbox */}
            <button
                className={`april-cal__task-check ${task.completed ? 'april-cal__task-check--checked' : ''}`}
                onClick={e => { e.stopPropagation(); onToggle(task.id); }}
                title={task.completed ? 'Mark in progress' : 'Mark completed'}
                style={task.completed ? { background: '#22C55E', borderColor: '#22C55E' } : {}}
            >
                {task.completed && '✓'}
            </button>

            <div className="april-cal__task-body">
                <span className="april-cal__task-brand" style={{ background: brandColor(task.brand) }}>
                    {brandShort(task.brand)}
                </span>
                <span className={`april-cal__task-title ${task.completed ? 'april-cal__task-title--done' : ''}`}>
                    {task.title}
                </span>
            </div>

            <span className="april-cal__task-emoji">{memberEmoji(task.person)}</span>

            {/* Actions */}
            <div className="april-cal__task-actions">
                <button className="april-cal__task-action" onClick={e => { e.stopPropagation(); onMoveStart(isMoving ? null : task.id); }} title="Move to another day">
                    ↻
                </button>
                <button className="april-cal__task-action april-cal__task-action--delete" onClick={e => { e.stopPropagation(); onDelete(task.id); }} title="Delete task">
                    ✕
                </button>
            </div>

            {/* Day picker dropdown */}
            {isMoving && (
                <div className="april-cal__move-picker">
                    <span className="april-cal__move-picker-label">Move to:</span>
                    <div className="april-cal__move-picker-days">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                            <button
                                key={d}
                                className={`april-cal__move-picker-day ${d === task.day ? 'april-cal__move-picker-day--current' : ''}`}
                                onClick={() => onMove(task.id, d)}
                                disabled={d === task.day}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AprilCalendar;
