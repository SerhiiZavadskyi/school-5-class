import { useState } from "react";
import { Trophy, ArrowRight, Check, X, Star, AlertTriangle, BookOpen, Rocket, Plus, Minus } from "lucide-react";
import FractionPie from "./components/FractionPie";

const Fraction = () => {
	const [view, setView] = useState("menu"); // 'menu', 'theory', 'quiz'
	const [currentLevel, setCurrentLevel] = useState(0);
	const [score, setScore] = useState(0);
	const [showFeedback, setShowFeedback] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [gameCompleted, setGameCompleted] = useState(false);

	// --- Interactive Theory States ---
	const [demoNum, setDemoNum] = useState(3);
	const [demoDen, setDemoDen] = useState(8);

	// --- Visual Components ---

	// --- Quest Data ---
	const quests = [
		{
			id: 1,
			title: "Місія 1: Запуск двигуна",
			context: "Капітане! Бак розділений на 6 рівних частин. Заповнено 4 з них.",
			question: "Обери дріб, що відповідає малюнку:",
			visual: <FractionPie numerator={4} denominator={6} color="text-yellow-500" size={120} />,
			options: [
				{ id: "a", label: "2/6" },
				{ id: "b", label: "4/6" },
				{ id: "c", label: "6/4" },
			],
			correct: "b",
			explanation: "Знаменник (6) показує кількість усіх частин, а чисельник (4) — скільки взяли.",
		},
		{
			id: 2,
			title: "Місія 2: Аналіз системи",
			context: "Риска дробу — це не просто лінія.",
			question: "Яку математичну дію замінює риска дробу?",
			visual: null,
			options: [
				{ id: "a", label: "Множення" },
				{ id: "b", label: "Ділення" },
				{ id: "c", label: "Віднімання" },
			],
			correct: "b",
			explanation: "Риску дробу можна розглядати як знак ділення: чисельник ділимо на знаменник.",
		},
		{
			id: 3,
			title: "Місія 3: Склад неправильних дробів",
			context: "Неправильні дроби — це ті, де чисельник не менший за знаменник.",
			question: "Який із цих дробів є НЕПРАВИЛЬНИМ?",
			visual: null,
			options: [
				{ id: "a", label: "3/8" },
				{ id: "b", label: "8/8" },
				{ id: "c", label: "1/2" },
			],
			correct: "b",
			explanation: "Дріб 8/8 неправильний, бо його чисельник дорівнює знаменнику (він дорівнює цілому).",
		},
		{
			id: 4,
			title: "Місія 4: Маневрування",
			context: "Порівняємо два сектори енергії.",
			question: "Який дріб більший: 2/5 чи 4/5?",
			visual: (
				<div className="flex gap-4 items-center">
					<div className="text-center">
						<FractionPie numerator={2} denominator={5} color="text-blue-500" />
						<p className="font-bold mt-2">2/5</p>
					</div>
					<span className="text-xl font-bold">VS</span>
					<div className="text-center">
						<FractionPie numerator={4} denominator={5} color="text-blue-500" />
						<p className="font-bold mt-2">4/5</p>
					</div>
				</div>
			),
			options: [
				{ id: "a", label: "2/5" },
				{ id: "b", label: "4/5" },
			],
			correct: "b",
			explanation: "З двох дробів з однаковими знаменниками більшим є той, чисельник якого більший (4 > 2).",
		},
		{
			id: 5,
			title: "Місія 5: Киснева станція",
			context: "Було 7/8 балона, витратили 3/8. Скільки залишилося?",
			question: "7/8 - 3/8 = ?",
			visual: <div className="text-3xl font-bold text-indigo-600">7/8 - 3/8 = ?</div>,
			options: [
				{ id: "a", label: "4/0" },
				{ id: "b", label: "4/8" },
				{ id: "c", label: "10/8" },
			],
			correct: "b",
			explanation: "При відніманні знаменник залишається тим самим (8), а чисельники віднімаються: 7 - 3 = 4.",
		},
		{
			id: 6,
			title: "Місія 6: Повна потужність",
			context: "Ми зібрали всі запчастини енергоблоку.",
			question: "Якому натуральному числу дорівнює дріб 12/12?",
			visual: <div className="p-4 bg-indigo-50 rounded-xl text-3xl font-black text-indigo-600">12 / 12 = ?</div>,
			options: [
				{ id: "a", label: "0" },
				{ id: "b", label: "1" },
				{ id: "c", label: "12" },
			],
			correct: "b",
			explanation: "Будь-який дріб, у якого чисельник дорівнює знаменнику, дорівнює одиниці (одному цілому).",
		},
		{
			id: 7,
			title: "Місія 7: Координатний промінь",
			context: "Точка A має координату 3/10. Точка B має координату 7/10.",
			question: "Яка точка розташована правіше на промені?",
			visual: null,
			options: [
				{ id: "a", label: "Точка A (3/10)" },
				{ id: "b", label: "Точка B (7/10)" },
			],
			correct: "b",
			explanation:
				"На координатному промені більше число завжди лежить правіше. Оскільки 7/10 > 3/10, то B правіше.",
		},
		{
			id: 8,
			title: "Місія 8: Ремонт корпусу",
			context: "Робот залатав 5/12 корпусу вранці та 4/12 ввечері.",
			question: "Яку частину корпусу залатано за весь день?",
			visual: <div className="text-2xl font-bold">5/12 + 4/12 = ?</div>,
			options: [
				{ id: "a", label: "9/12" },
				{ id: "b", label: "1/12" },
				{ id: "c", label: "9/24" },
			],
			correct: "a",
			explanation: "Додаємо чисельники: 5 + 4 = 9. Знаменник 12 не змінюється.",
		},
		{
			id: 9,
			title: "Місія 9: Порівняння часток",
			context: "Маємо два піроги однакового розміру. Перший розрізали на 4 частини, другий на 8.",
			question: "Яка частина більша: 1/4 чи 1/8?",
			visual: (
				<div className="flex gap-4 items-center">
					<div className="text-center">
						<FractionPie numerator={1} denominator={4} color="text-pink-500" />
						<p className="font-bold mt-2">1/4</p>
					</div>
					<div className="text-center">
						<FractionPie numerator={1} denominator={8} color="text-pink-500" />
						<p className="font-bold mt-2">1/8</p>
					</div>
				</div>
			),
			options: [
				{ id: "a", label: "1/4" },
				{ id: "b", label: "1/8" },
			],
			correct: "a",
			explanation: "Чим на меншу кількість частин ми ділимо ціле, тим більшою буде кожна частина.",
		},
		{
			id: 10,
			title: "Місія 10: Логіка Всесвіту",
			context: "Чисельник дробу збільшили у 2 рази, а знаменник не міняли.",
			question: "Як змінився дріб?",
			visual: null,
			options: [
				{ id: "a", label: "Зменшився у 2 рази" },
				{ id: "b", label: "Збільшився у 2 рази" },
				{ id: "c", label: "Не змінився" },
			],
			correct: "b",
			explanation: "Чисельник прямо пропорційний значенню дробу: більше частин — більше значення.",
		},
	];

	const handleAnswer = (optionId: string) => {
		setSelectedOption(optionId);
		const correct = optionId === quests[currentLevel].correct;
		setIsCorrect(correct);
		setShowFeedback(true);
		if (correct) setScore(score + 1);
	};

	const nextLevel = () => {
		if (currentLevel < quests.length - 1) {
			setCurrentLevel(currentLevel + 1);
			setShowFeedback(false);
			setSelectedOption(null);
		} else {
			setGameCompleted(true);
		}
	};

	const MainMenu = () => (
		<div className="text-center p-8 bg-white rounded-3xl shadow-xl border-4 border-indigo-100 max-w-md w-full animate-in zoom-in duration-300">
			<div className="bg-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ring-8 ring-indigo-50">
				<Rocket className="text-white w-12 h-12" />
			</div>
			<h1 className="text-4xl font-black text-indigo-900 mb-2">Космічна Академія</h1>
			<p className="text-slate-500 mb-10 text-lg">Стань майстром дробів та врятуй галактику!</p>
			<div className="flex flex-col gap-4">
				<button
					onClick={() => setView("quiz")}
					className="py-5 px-6 bg-indigo-600 text-white rounded-2xl font-bold text-2xl hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3"
				>
					🚀 Почати квест (10 місій)
				</button>
				<button
					onClick={() => setView("theory")}
					className="py-5 px-6 bg-white text-indigo-600 border-2 border-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition flex items-center justify-center gap-3"
				>
					<BookOpen size={24} /> Довідник кадета
				</button>
			</div>
		</div>
	);

	const TheoryView = () => (
		<div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full border-b-8 border-indigo-600 animate-in slide-in-from-right duration-300">
			<div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<BookOpen /> Лабораторія Дробів
				</h2>
				<button
					onClick={() => setView("menu")}
					className="bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 font-bold transition"
				>
					Назад
				</button>
			</div>

			<div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[75vh]">
				{/* Interactive Sandbox with Fraction Line */}
				<section className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 shadow-inner">
					<h3 className="text-xl font-black text-indigo-900 mb-4 flex items-center gap-2">
						🛰️ Конструктор Дробу
					</h3>
					<div className="flex flex-col md:flex-row items-center justify-around gap-8">
						<div className="flex flex-col items-center gap-4">
							<div className="flex items-center gap-4">
								<div className="flex flex-col gap-1">
									<button
										onClick={() => setDemoNum((prev) => prev + 1)}
										className="p-1 bg-white rounded shadow hover:bg-indigo-100 text-indigo-600"
									>
										<Plus size={16} />
									</button>
									<button
										onClick={() => setDemoNum((prev) => Math.max(0, prev - 1))}
										className="p-1 bg-white rounded shadow hover:bg-indigo-100 text-indigo-600"
									>
										<Minus size={16} />
									</button>
								</div>

								<div className="flex flex-col items-center min-w-[70px]">
									<span className="text-5xl font-black text-indigo-600 mb-1 leading-none">
										{demoNum}
									</span>
									<div className="w-full h-1.5 bg-indigo-900 rounded-full my-1 shadow-sm"></div>
									<span className="text-5xl font-black text-slate-700 mt-1 leading-none">
										{demoDen}
									</span>
								</div>

								<div className="flex flex-col gap-1">
									<button
										onClick={() => setDemoDen((prev) => Math.min(prev + 1, 32))}
										className="p-1 bg-slate-200 rounded shadow hover:bg-slate-300 text-slate-700"
									>
										<Plus size={16} />
									</button>
									<button
										onClick={() => setDemoDen((prev) => Math.max(1, prev - 1))}
										className="p-1 bg-slate-200 rounded shadow hover:bg-slate-300 text-slate-700"
									>
										<Minus size={16} />
									</button>
								</div>
							</div>
							<div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 bg-white px-2 py-1 rounded border">
								Керуй чисельником та знаменником
							</div>
						</div>

						<div className="flex flex-col items-center">
							<div className="p-4 bg-white rounded-full shadow-lg border-4 border-indigo-100">
								<FractionPie
									numerator={demoNum}
									denominator={demoDen}
									size={130}
									color={demoNum > demoDen ? "text-orange-500" : "text-emerald-500"}
								/>
							</div>
							<div
								className={`mt-4 px-4 py-1.5 rounded-xl font-black text-sm shadow-sm border-2 ${demoNum > demoDen ? "bg-orange-50 text-orange-700 border-orange-200" : demoNum === demoDen ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
							>
								{demoNum > demoDen ? "НЕПРАВИЛЬНИЙ" : demoNum === demoDen ? "ДОРІВНЮЄ 1" : "ПРАВИЛЬНИЙ"}
							</div>
						</div>
					</div>
				</section>

				{/* Text Theory */}
				<section className="space-y-6 text-slate-700 leading-relaxed">
					<div>
						<h3 className="text-xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2 mb-4">
							1. Поняття звичайного дробу
						</h3>
						<p className="mb-2">
							Записи виду <span className="font-bold text-indigo-600">a/b</span> називають звичайними
							дробами.
						</p>
						<ul className="space-y-3 list-none pl-0">
							<li className="flex items-start gap-2">
								<div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
								<p>
									<span className="font-bold text-indigo-900">Чисельник (a)</span> — пишеться над
									рискою. Показує, скільки рівних частин взяли.
								</p>
							</li>
							<li className="flex items-start gap-2">
								<div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
								<p>
									<span className="font-bold text-indigo-900">Знаменник (b)</span> — пишеться під
									рискою. Показує, на скільки рівних частин поділили ціле.
								</p>
							</li>
							<li className="flex items-start gap-2 border-l-4 border-indigo-200 pl-4 py-1 bg-indigo-50/50 rounded-r-lg">
								<p className="font-medium italic text-indigo-800">«Риска дробу — це знак ділення».</p>
							</li>
						</ul>
					</div>

					<div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm">
						<h3 className="text-xl font-bold text-indigo-900 mb-4">2. Правильні та неправильні дроби</h3>
						<div className="grid md:grid-cols-2 gap-4 text-sm">
							<div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-emerald-500">
								<p className="font-black text-emerald-700 mb-2 uppercase tracking-tight text-xs">
									Правильний (a &lt; b)
								</p>
								<p className="leading-relaxed">
									Чисельник менший за знаменник. Дріб <span className="underline">менший за 1</span>.
								</p>
							</div>
							<div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-orange-500">
								<p className="font-black text-orange-700 mb-2 uppercase tracking-tight text-xs">
									Неправильний (a ≥ b)
								</p>
								<p className="leading-relaxed">
									Чисельник більший або рівний знаменнику. Дріб{" "}
									<span className="underline">не менший за 1</span>.
								</p>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2 mb-4">
							3. Дії з однаковими знаменниками
						</h3>
						<div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-3xl shadow-lg relative overflow-hidden">
							<div className="relative z-10 font-bold text-lg italic text-center">
								«Знаменник залишаємо той самий, а чисельники додаємо або віднімаємо».
							</div>
							<Rocket className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
						</div>
					</div>
				</section>
			</div>

			<div className="p-6 bg-slate-50 text-center border-t">
				<button
					onClick={() => setView("quiz")}
					className="bg-indigo-600 text-white py-4 px-12 rounded-2xl font-black text-xl hover:bg-indigo-700 transition shadow-md active:scale-95"
				>
					Стати до випробувань
				</button>
			</div>
		</div>
	);

	if (view === "menu")
		return (
			<div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
				<MainMenu />
			</div>
		);
	if (view === "theory")
		return (
			<div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
				<TheoryView />
			</div>
		);

	if (gameCompleted) {
		return (
			<div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4 font-sans animate-in zoom-in duration-500">
				<div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border-t-8 border-yellow-400">
					<Trophy className="w-28 h-28 mx-auto text-yellow-400 mb-6 drop-shadow-md" />
					<h2 className="text-4xl font-black text-indigo-900 mb-2">ГЕРОЙ ГАЛАКТИКИ!</h2>
					<p className="text-slate-500 mb-8 text-xl">
						Курс кадета завершено на {Math.round((score / quests.length) * 100)}%
					</p>
					<div className="bg-slate-50 rounded-2xl p-4 mb-8 text-indigo-900 font-black text-2xl border-2 border-indigo-100">
						{score} / {quests.length} ПРАВИЛЬНО
					</div>
					<button
						onClick={() => {
							setView("menu");
							setGameCompleted(false);
							setCurrentLevel(0);
							setScore(0);
						}}
						className="w-full py-5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition font-black text-xl shadow-lg"
					>
						Повернутись на базу
					</button>
				</div>
			</div>
		);
	}

	const currentQuest = quests[currentLevel];

	return (
		<div className="min-h-screen bg-slate-100 py-8 px-4 font-sans text-slate-800">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex justify-between items-center border border-slate-200">
					<button
						onClick={() => setView("menu")}
						className="text-indigo-600 font-bold hover:bg-indigo-50 px-3 py-1 rounded-lg transition flex items-center gap-1"
					>
						← Меню
					</button>
					<div className="flex flex-col items-center">
						<span className="font-black text-indigo-900 tracking-wider uppercase text-xs">
							Місія {currentLevel + 1} з 10
						</span>
						<div className="flex gap-1 mt-1">
							{[...Array(quests.length)].map((_, i) => (
								<div
									key={i}
									className={`w-2.5 h-1.5 rounded-full transition-colors ${i <= currentLevel ? "bg-indigo-500" : "bg-slate-200"}`}
								></div>
							))}
						</div>
					</div>
					<div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-black flex items-center gap-1 shadow-sm border border-yellow-200">
						<Star size={14} fill="currentColor" /> {score}
					</div>
				</div>

				<div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-indigo-200 animate-in slide-in-from-bottom-8 duration-500">
					<div className="p-8 md:p-12">
						<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-2xl mb-8">
							<p className="text-slate-700 italic text-lg leading-relaxed">"{currentQuest.context}"</p>
						</div>

						<div className="flex flex-col items-center mb-10">
							{currentQuest.visual && (
								<div className="mb-8 p-8 bg-slate-50 rounded-3xl border border-slate-200 w-full flex justify-center transform hover:scale-105 transition-transform duration-300">
									{currentQuest.visual}
								</div>
							)}
							<h3 className="text-2xl md:text-3xl font-black text-center text-slate-800 leading-tight">
								{currentQuest.question}
							</h3>
						</div>

						<div className="grid gap-4">
							{currentQuest.options.map((option) => (
								<button
									key={option.id}
									onClick={() => !showFeedback && handleAnswer(option.id)}
									disabled={showFeedback}
									className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group
                    ${
						showFeedback && option.id === currentQuest.correct
							? "bg-green-100 border-green-500 text-green-900 shadow-inner"
							: showFeedback && option.id === selectedOption
								? "bg-red-100 border-red-500 text-red-900"
								: "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm active:scale-95"
					}`}
								>
									<span className="font-black text-2xl">{option.label}</span>
									{showFeedback && option.id === currentQuest.correct && (
										<Check className="text-green-600 w-8 h-8 animate-in zoom-in" />
									)}
									{showFeedback &&
										option.id === selectedOption &&
										option.id !== currentQuest.correct && (
											<X className="text-red-600 w-8 h-8 animate-in shake" />
										)}
									{!showFeedback && (
										<ArrowRight className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
									)}
								</button>
							))}
						</div>
					</div>

					{showFeedback && (
						<div
							className={`p-8 border-t-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
						>
							<div className="flex items-start gap-5 mb-6">
								<div
									className={`p-3 rounded-2xl ${isCorrect ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
								>
									{isCorrect ? <Check size={32} /> : <AlertTriangle size={32} />}
								</div>
								<div className="flex-1">
									<h4
										className={`font-black text-2xl mb-2 ${isCorrect ? "text-green-900" : "text-red-900"}`}
									>
										{isCorrect ? "ВІРНО!" : "МАЙЖЕ ВДАЛО..."}
									</h4>
									<p className="text-slate-700 text-lg leading-relaxed">{currentQuest.explanation}</p>
								</div>
							</div>
							<button
								onClick={nextLevel}
								className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-2xl hover:bg-indigo-700 transition flex items-center justify-center gap-3 shadow-lg"
							>
								{currentLevel < quests.length - 1 ? "Далі" : "Фінал місії"} <ArrowRight size={28} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Fraction;
