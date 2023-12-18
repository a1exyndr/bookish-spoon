function dowFile(dowlound) {
    let div = document.getElementById("content-1");
    let strings=[];

    let reader = new FileReader();
    reader.readAsText(dowlound.files[0]);

    reader.onload = function () {
        let table = document.createElement("table");
        strings = reader.result.split("\n");
        strings.pop()

        for (let string of strings) {
            let tr = document.createElement("tr");


            let columns = string.split(";");
            for (let column of columns) {
                let td = document.createElement("td");
                td.innerHTML = column;
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        div.appendChild(table);
        party(strings);
        stat(strings);
        stat2(strings);
        drawChart(strings);
    };

}

function addData() { 
    //Входные данные
    let surname = 
        document.getElementById("surnameInput").value; 
    let group = 
        document.getElementById("groupInput").value; 
    let informatics = 
        document.getElementById("InformaticsInput").value; 
    let physics = 
        document.getElementById("physicsInput").value;
    let mathemathics = 
        document.getElementById("mathemathicsInput").value;
    let literature = 
        document.getElementById("literatureInput").value;
    let music = 
        document.getElementById("musicInput").value;
            
    // Создание таблицы и вставка новой строки в конец 
    let table = document.getElementById("outputTable"); 
    let newRow = table.insertRow(table.rows.length); 
    
    // Вставка данных в ячейки новой строки 
    newRow.insertCell(0).innerHTML = surname; 
    newRow.insertCell(1).innerHTML = group; 
    newRow.insertCell(2).innerHTML = informatics; 
    newRow.insertCell(3).innerHTML = physics;
    newRow.insertCell(4).innerHTML = mathemathics;
    newRow.insertCell(5).innerHTML = literature;
    newRow.insertCell(6).innerHTML = music;
    newRow.insertCell(7).innerHTML = 
        '<button onclick="editData(this)">Редактировать</button>'+ 
        '<button onclick="deleteData(this)">Удалить</button>'; 
            
    // Очистка полей ввода 
    clearInputs(); 
} 

function editData(button) { 
            
    // Получение родительской строки нажатой кнопки 
    let row = button.parentNode.parentNode; 
            
    // Получение ячейки внутри строки
    let surnameCell = row.cells[0]; 
    let groupCell = row.cells[1]; 
    let informaticsCell = row.cells[2]; 
    let physicsCell = row.cells[3];
    let mathemathicsCell = row.cells[4];
    let literatureCell = row.cells[5];
    let musicCell = row.cells[6];
            
    // Предложить пользователю ввести обновленные значения 
    let surnameInput = 
        prompt("Введите для изменения фамилии:", 
            surnameCell.innerHTML); 
    let groupInput = 
        prompt("Введите для изменения группы:", 
            groupCell.innerHTML); 
    let InformaticsInput = 
        prompt("Введите для изменения оценки по информатике:", 
            informaticsCell.innerHTML 
        ); 
    let physicsInput = 
        prompt("Введите для изменения оценки по физике:", 
            physicsCell.innerHTML 
        );
    let mathemathicsInput = 
        prompt("Введите для изменения оценки по математике:", 
            mathemathicsCell.innerHTML 
        );
    let literatureInput = 
        prompt("Введите для изменения оценки по литературе:", 
            literatureCell.innerHTML 
        );
    let musicInput = 
        prompt("Введите для изменения оценки по музыке:", 
            musicCell.innerHTML 
        );     
            
    // Обновите содержимое ячейки новыми значениями
    surnameCell.innerHTML = surnameInput; 
    groupCell.innerHTML = groupInput; 
    informaticsCell.innerHTML = InformaticsInput; 
    physicsCell.innerHTML = physicsInput;
    mathemathicsCell.innerHTML = mathemathicsInput;
    literatureCell.innerHTML = literatureInput;
    musicCell.innerHTML = musicInput;

} 

function deleteData(button) { 
    
    // Получить родительскую строку нажатой кнопки 
    let row = button.parentNode.parentNode; 

    // Удалить строку из таблицы 
    row.parentNode.removeChild(row); 
}

function clearInputs() { 
            
    // Очистить поля ввода 
    document.getElementById("surnameInput").value = ""; 
    document.getElementById("groupInput").value = ""; 
    document.getElementById("InformaticsInput").value = ""; 
    document.getElementById("physicsInput").value = "";
    document.getElementById("mathemathicsInput").value = "";
    document.getElementById("literatureInput").value = ""; 
    document.getElementById("musicInput").value = ""; 
} 

//Загрузка документа по ссылке:
function downloadTable() {
    let table = document.getElementById("outputTable");
    let csvContent = "";
    // Получить содержимое таблицы в виде значений
    for (let i = 0; i < table.rows.length; i++) {
        let rowData = table.rows[i].cells;
        let csvRow = [];

        for (let j = 0; j < rowData.length - 1; j++) {
            csvRow.push(rowData[j].innerText);
        }

    csvContent += csvRow.join(";") + "\n";
    }

    // Создайте и загрузите файл CSV
    let csvContentUtf8 = '\ufeff' + csvContent; // Добавляем BOM для кодировки UTF-8
    let csvBlob = new Blob([csvContentUtf8], { type: "text/csv;charset=utf-8" }); // Устанавливаем кодировку UTF-8
    let csvUrl = URL.createObjectURL(csvBlob);
    let csvLink = document.createElement("a");
    csvLink.href = csvUrl;
    csvLink.download = "table.csv";
    csvLink.click();

    // Создайте и загрузите текстовый файл
    let txtBlob = new Blob([csvContent], { type: "text/plain;charset=utf-8" }); // Устанавливаем кодировку UTF-8
    let txtUrl = URL.createObjectURL(txtBlob);
    let txtLink = document.createElement("a");
    txtLink.href = txtUrl;
    txtLink.download = "table.txt";
    txtLink.click();

    // Создайте и загрузите файл HTML
    let tableContent = table.outerHTML;
    let htmlBlob = new Blob([tableContent], {type: "text/html;charset=utf-8"}); // Устанавливаем кодировку UTF-8
    let htmlUrl = URL.createObjectURL(htmlBlob);
    let htmlLink = document.createElement("a");
    htmlLink.href = htmlUrl;
    htmlLink.download = "table.html";
    htmlLink.click();
}

//Объединение данных
function addDataToTable(data) {
    let table = document.getElementById("outputTable");
    let newRow = table.insertRow(table.rows.length);

    newRow.insertCell(0).innerHTML = data.surname;
    newRow.insertCell(1).innerHTML = data.group;
    newRow.insertCell(2).innerHTML = data.informatics;
    newRow.insertCell(3).innerHTML = data.physics;
    newRow.insertCell(4).innerHTML = data.mathemathics;
    newRow.insertCell(5).innerHTML = data.literature;
    newRow.insertCell(6).innerHTML = data.music;
    newRow.insertCell(7).innerHTML = '<button onclick="editData(this)">Редактировать</button>' + '<button onclick="deleteData(this)">Удалить</button>';

    clearInputs();
}

function party(strings) {
    for (let i = 1; i < strings.length; i++) {
    let data = strings[i].split(";");
    let obj = {
        surname: data[0],
        group: data[1],
        informatics: data[2],
        physics: data[3],
        mathemathics: data[4],
        literature: data[5],
        music: data[6],
        };
    addDataToTable(obj);
    }
}

function stat(strings) {
    let subjects = ["Информатика", "Физика", "Математика", "Литература", "Музыка"];
    let table = document.createElement("table");
    // Создание заголовка таблицы
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerHTML = "Предмет";
    tr.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Средний балл";
    tr.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "Медиана";
    tr.appendChild(th3);
    let th4 = document.createElement("th");
    th4.innerHTML = "Количество 5";
    tr.appendChild(th4);
    let th5 = document.createElement("th");
    th5.innerHTML = "Процент 5";
    tr.appendChild(th5);
    let th6 = document.createElement("th");
    th6.innerHTML = "Количество 4";
    tr.appendChild(th6);
    let th7 = document.createElement("th");
    th7.innerHTML = "Процент 4";
    tr.appendChild(th7);
    let th8 = document.createElement("th");
    th8.innerHTML = "Количество 3";
    tr.appendChild(th8);
    let th9 = document.createElement("th");
    th9.innerHTML = "Процент 3";
    tr.appendChild(th9);
    let th10 = document.createElement("th");
    th10.innerHTML = "Количество 2";
    tr.appendChild(th10);
    let th11 = document.createElement("th");
    th11.innerHTML = "Процент 2";
    tr.appendChild(th11);

    table.appendChild(tr);

    // Расчет данных и добавление новой строки в таблицу для каждого предмета
    for (let subject of subjects) {
        let subjectData = {};

        // Подсчет суммы и количества оценок
        let sum = 0;
        let count = 0;
        for (let i = 1; i < strings.length; i++) {
            let data = strings[i].split(";");
            let grade = parseInt(data[subjects.indexOf(subject) + 2]);
            if (!isNaN(grade)) {
                sum += grade;
                count++;
            }
        }
        
        // Расчет среднего значения
        let average = sum / count;
        if (isNaN(average)) {
            average = "-";
        }
        
        // Получение списка оценок
        let grades = [];
        for (let i = 1; i < strings.length; i++) {
            let data = strings[i].split(";");
            let grade = parseInt(data[subjects.indexOf(subject) + 2]);
            if (!isNaN(grade)) {
                grades.push(grade);
            }
        }
        
        // Сортировка списка оценок
        grades.sort(function(a, b) {
            return a - b;
        });
        
        // Расчет медианы
        let median = "-";
        if (grades.length > 0) {
            if (grades.length % 2 === 0) {
                median = (grades[grades.length / 2 - 1] + grades[grades.length / 2]) / 2;
            } else {
                median = grades[Math.floor(grades.length / 2)];
            }
        }
        
        // Подсчет количества оценок и процента каждой оценки
        let gradeCounts = {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0
        };
        for (let grade of grades) {
            if (grade === 5) {
                gradeCounts["5"]++;
            } else if (grade === 4) {
                gradeCounts["4"]++;
            } else if (grade === 3) {
                gradeCounts["3"]++;
            } else if (grade === 2) {
                gradeCounts["2"]++;
            }
        }
        
        let gradePercentages = {
            "5": gradeCounts["5"] / count * 100 || 0,
            "4": gradeCounts["4"] / count * 100 || 0,
            "3": gradeCounts["3"] / count * 100 || 0,
            "2": gradeCounts["2"] / count * 100 || 0
        };
          
        // Создание строки таблицы с данными предмета
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = subject;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.innerHTML = average.toFixed(2);
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.innerHTML = median;
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.innerHTML = gradeCounts["5"];
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.innerHTML = gradePercentages["5"].toFixed(2) + "%";
        tr.appendChild(td5);
        let td6 = document.createElement("td");
        td6.innerHTML = gradeCounts["4"];
        tr.appendChild(td6);
        let td7 = document.createElement("td");
        td7.innerHTML = gradePercentages["4"].toFixed(2) + "%";
        tr.appendChild(td7);
        let td8 = document.createElement("td");
        td8.innerHTML = gradeCounts["3"];
        tr.appendChild(td8);
        let td9 = document.createElement("td");
        td9.innerHTML = gradePercentages["3"].toFixed(2) + "%";
        tr.appendChild(td9);
        let td10 = document.createElement("td");
        td10.innerHTML = gradeCounts["2"];
        tr.appendChild(td10);
        let td11 = document.createElement("td");
        td11.innerHTML = gradePercentages["2"].toFixed(2) + "%";
        tr.appendChild(td11);

        table.appendChild(tr);
    }

    let div = document.getElementById("content-3");
    div.innerHTML = '';
    div.appendChild(table);
}




function stat2(marks) {
    let table = document.createElement("table");
    // Сгруппируем данные по группам и предметам
    const groupedData = marks.slice(1).reduce((grouped, mark) => {
    const [surname, group, mathAnalysis, physics, mathemathics, literature, music] = mark.split(';');
    grouped[group] = grouped[group] || { mathAnalysis: [], physics: [], mathemathics: [], literature: [], music: [] };
    grouped[group].mathAnalysis.push(Number(mathAnalysis));
    grouped[group].physics.push(Number(physics));
    grouped[group].mathemathics.push(Number(mathemathics));
    grouped[group].literature.push(Number(literature));
    grouped[group].music.push(Number(music));
    return grouped;
    }, {});

    // Вычисляем статистику для каждой группы и предмета
const groupStats = Object.entries(groupedData).map(([group, marks]) => {
    // Вычисляем среднюю оценку, медиану, количество и процент учеников для каждой оценки
    const mathAnalysisScores = marks.mathAnalysis.filter(score => !isNaN(score));
    const physicsScores = marks.physics.filter(score => !isNaN(score));
    const mathemathicsScores = marks.mathemathics.filter(score => !isNaN(score));
    const literatureScores = marks.literature.filter(score => !isNaN(score));
    const musicScores = marks.music.filter(score => !isNaN(score));

    const mathAnalysisAverage = mathAnalysisScores.reduce((sum, score) => sum + score, 0) / mathAnalysisScores.length;
    const physicsAverage = physicsScores.reduce((sum, score) => sum + score, 0) / physicsScores.length;
    const mathemathicsAverage = mathemathicsScores.reduce((sum, score) => sum + score, 0) / mathemathicsScores.length;
    const literatureAverage = literatureScores.reduce((sum, score) => sum + score, 0) / literatureScores.length;
    const musicAverage = musicScores.reduce((sum, score) => sum + score, 0) / musicScores.length;

    const mathAnalysisMedian = mathAnalysisScores.sort((a, b) => a - b)[Math.floor(mathAnalysisScores.length / 2)];
    const physicsMedian = physicsScores.sort((a, b) => a - b)[Math.floor(physicsScores.length / 2)];
    const mathemathicsMedian = mathemathicsScores.sort((a, b) => a - b)[Math.floor(mathemathicsScores.length / 2)];
    const literatureMedian = literatureScores.sort((a, b) => a - b)[Math.floor(literatureScores.length / 2)];
    const musicMedian = musicScores.sort((a, b) => a - b)[Math.floor(musicScores.length / 2)];

        const mathAnalysis5Count = mathAnalysisScores.filter(score => score === 5).length;
        const physics5Count = physicsScores.filter(score => score === 5).length;
        const mathemathics5Count = mathemathicsScores.filter(score => score === 5).length;
        const literature5Count = literatureScores.filter(score => score === 5).length;
        const music5Count = musicScores.filter(score => score === 5).length;

        const mathAnalysis5Percentage = (mathAnalysis5Count / mathAnalysisScores.length) * 100;
        const physics5Percentage = (physics5Count / physicsScores.length) * 100;
        const mathemathics5Percentage = (mathemathics5Count / mathemathicsScores.length) * 100;
        const literature5Percentage = (literature5Count / literatureScores.length) * 100;
        const music5Percentage = (music5Count / musicScores.length) * 100;

        const mathAnalysis4Count = mathAnalysisScores.filter(score => score === 4).length;
        const physics4Count = physicsScores.filter(score => score === 4).length;
        const mathemathics4Count = mathemathicsScores.filter(score => score === 4).length;
        const literature4Count = literatureScores.filter(score => score === 4).length;
        const music4Count = musicScores.filter(score => score === 4).length;

        const mathAnalysis4Percentage = (mathAnalysis4Count / mathAnalysisScores.length) * 100;
        const physics4Percentage = (physics4Count / physicsScores.length) * 100;
        const mathemathics4Percentage = (mathemathics4Count / mathemathicsScores.length) * 100;
        const literature4Percentage = (literature4Count / literatureScores.length) * 100;
        const music4Percentage = (music4Count / musicScores.length) * 100;

        const mathAnalysis3Count = mathAnalysisScores.filter(score => score === 3).length;
        const physics3Count = physicsScores.filter(score => score === 3).length;
        const mathemathics3Count = mathemathicsScores.filter(score => score === 3).length;
        const literature3Count = literatureScores.filter(score => score === 3).length;
        const music3Count = musicScores.filter(score => score === 3).length;

        const mathAnalysis3Percentage = (mathAnalysis3Count / mathAnalysisScores.length) * 100;
        const physics3Percentage = (physics3Count / physicsScores.length) * 100;
        const mathemathics3Percentage = (mathemathics3Count / mathemathicsScores.length) * 100;
        const literature3Percentage = (literature3Count / literatureScores.length) * 100;
        const music3Percentage = (music3Count / musicScores.length) * 100;

        const mathAnalysis2Count = mathAnalysisScores.filter(score => score === 2).length;
        const physics2Count = physicsScores.filter(score => score === 2).length;
        const mathemathics2Count = mathemathicsScores.filter(score => score === 2).length;
        const literature2Count = literatureScores.filter(score => score === 2).length;
        const music2Count = musicScores.filter(score => score === 2).length;

        const mathAnalysis2Percentage = (mathAnalysis2Count / mathAnalysisScores.length) * 100;
        const physics2Percentage = (physics2Count / physicsScores.length) * 100;
        const mathemathics2Percentage = (mathemathics2Count / mathemathicsScores.length) * 100;
        const literature2Percentage = (literature2Count / literatureScores.length) * 100;
        const music2Percentage = (music2Count / musicScores.length) * 100;



    return [group, mathAnalysisAverage, mathAnalysisMedian, mathAnalysis5Count, mathAnalysis5Percentage, mathAnalysis4Count, mathAnalysis4Percentage, mathAnalysis3Count, mathAnalysis3Percentage, mathAnalysis2Count, mathAnalysis2Percentage, 
        physicsAverage, physicsMedian, physics5Count, physics5Percentage, physics4Count, physics4Percentage, physics3Count, physics3Percentage, physics2Count, physics2Percentage,
        mathemathicsAverage, mathemathicsMedian, mathemathics5Count, mathemathics5Percentage, mathemathics4Count, mathemathics4Percentage, mathemathics3Count, mathemathics3Percentage, mathemathics2Count, mathemathics2Percentage,
        literatureAverage, literatureMedian, literature5Count, literature5Percentage, literature4Count, literature4Percentage, literature3Count, literature3Percentage, literature2Count, literature2Percentage,
        musicAverage, musicMedian, music5Count, music5Percentage, music4Count, music4Percentage, music3Count, music3Percentage, music2Count, music2Percentage];
});

    // Отображаем статистику в таблице
    let tr = document.createElement("tr");
    let headers = ['Группа', 'Информатика ср.балл', 'Информатика медиана', 'Информатика количество 5', 'Информатика процент 5', 'Информатика количество 4', 'Информатика процент 4', 'Информатика количество 3', 'Информатика процент 3', 'Информатика количество 2', 'Информатика процент 2' , 
        'Физика ср.балл', 'Физика медиана', 'Физика количество 5', 'Физика процент 5', 'Физика количество 4', 'Физика процент 4', 'Физика количество 3', 'Физика процент 3', 'Физика количество 2', 'Физика процент 2', 
        'Математика ср.балл', 'Математика медиана', 'Математика количество 5', 'Математика процент 5', 'Математика количество 4', 'Математика процент 4', 'Математика количество 3', 'Математика процент 3', 'Математика количество 2', 'Математика процент 2', 
        'Литература ср.балл', 'Литература медиана', 'Литература количество 5', 'Литература процент 5', 'Литература количество 4', 'Литература процент 4', 'Литература количество 3', 'Литература процент 3', 'Литература количество 2', 'Литература процент 2',
        'Музыка ср.балл', 'Музыка медиана', 'Музыка количество 5', 'Музыка процент 5', 'Музыка количество 4', 'Музыка процент 4', 'Музыка количество 3', 'Музыка процент 3', 'Музыка количество 2', 'Музыка процент 2'];
    for (const header of headers) {
        let th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for (const [group, mathAnalysisAverage, mathAnalysisMedian, mathAnalysis5Count, mathAnalysis5Percentage, mathAnalysis4Count, mathAnalysis4Percentage, mathAnalysis3Count, mathAnalysis3Percentage, mathAnalysis2Count, mathAnalysis2Percentage, 
        physicsAverage, physicsMedian, physics5Count, physics5Percentage, physics4Count, physics4Percentage, physics3Count, physics3Percentage, physics2Count, physics2Percentage,
        mathemathicsAverage, mathemathicsMedian, mathemathics5Count, mathemathics5Percentage, mathemathics4Count, mathemathics4Percentage, mathemathics3Count, mathemathics3Percentage, mathemathics2Count, mathemathics2Percentage,
        literatureAverage, literatureMedian, literature5Count, literature5Percentage, literature4Count, literature4Percentage, literature3Count, literature3Percentage, literature2Count, literature2Percentage,
        musicAverage, musicMedian, music5Count, music5Percentage, music4Count, music4Percentage, music3Count, music3Percentage, music2Count, music2Percentage] of groupStats) {
        let tr = document.createElement("tr");

        let td0 = document.createElement("td");
        td0.innerHTML = group;
        tr.appendChild(td0);

        let td1 = document.createElement("td");
        td1.innerHTML = mathAnalysisAverage.toFixed(2);
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = mathAnalysisMedian;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = mathAnalysis5Count;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = mathAnalysis5Percentage.toFixed(2) + '%';
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = mathAnalysis4Count;
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        td6.innerHTML = mathAnalysis4Percentage.toFixed(2) + '%';
        tr.appendChild(td6);

        let td7 = document.createElement("td");
        td7.innerHTML = mathAnalysis3Count;
        tr.appendChild(td7);

        let td8 = document.createElement("td");
        td8.innerHTML = mathAnalysis3Percentage.toFixed(2) + '%';
        tr.appendChild(td8);

        let td9 = document.createElement("td");
        td9.innerHTML = mathAnalysis2Count;
        tr.appendChild(td9);

        let td10 = document.createElement("td");
        td10.innerHTML = mathAnalysis2Percentage.toFixed(2) + '%';
        tr.appendChild(td10);



        let td11 = document.createElement("td");
        td11.innerHTML = physicsAverage.toFixed(2);
        tr.appendChild(td11);

        let td12 = document.createElement("td");
        td12.innerHTML = physicsMedian;
        tr.appendChild(td12);

        let td13 = document.createElement("td");
        td13.innerHTML = physics5Count;
        tr.appendChild(td13);

        let td14 = document.createElement("td");
        td14.innerHTML = physics5Percentage.toFixed(2) + '%';
        tr.appendChild(td14);

        let td15 = document.createElement("td");
        td15.innerHTML = physics4Count;
        tr.appendChild(td15);

        let td16 = document.createElement("td");
        td16.innerHTML = physics4Percentage.toFixed(2) + '%';
        tr.appendChild(td16);

        let td17 = document.createElement("td");
        td17.innerHTML = physics3Count;
        tr.appendChild(td17);

        let td18 = document.createElement("td");
        td18.innerHTML = physics3Percentage.toFixed(2) + '%';
        tr.appendChild(td18);

        let td19 = document.createElement("td");
        td19.innerHTML = physics2Count;
        tr.appendChild(td19);

        let td20 = document.createElement("td");
        td20.innerHTML = physics2Percentage.toFixed(2) + '%';
        tr.appendChild(td20);



        let td21 = document.createElement("td");
        td21.innerHTML = mathemathicsAverage.toFixed(2);
        tr.appendChild(td21);

        let td22 = document.createElement("td");
        td22.innerHTML = mathemathicsMedian;
        tr.appendChild(td22);

        let td23 = document.createElement("td");
        td23.innerHTML = mathemathics5Count;
        tr.appendChild(td23);

        let td24 = document.createElement("td");
        td24.innerHTML = mathemathics5Percentage.toFixed(2) + '%';
        tr.appendChild(td24);

        let td25 = document.createElement("td");
        td25.innerHTML = mathemathics4Count;
        tr.appendChild(td25);

        let td26 = document.createElement("td");
        td26.innerHTML = mathemathics4Percentage.toFixed(2) + '%';
        tr.appendChild(td26);

        let td27 = document.createElement("td");
        td27.innerHTML = mathemathics3Count;
        tr.appendChild(td27);

        let td28 = document.createElement("td");
        td28.innerHTML = mathemathics3Percentage.toFixed(2) + '%';
        tr.appendChild(td28);

        let td29 = document.createElement("td");
        td29.innerHTML = mathemathics2Count;
        tr.appendChild(td29);

        let td30 = document.createElement("td");
        td30.innerHTML = mathemathics2Percentage.toFixed(2) + '%';
        tr.appendChild(td30);




        let td31 = document.createElement("td");
        td31.innerHTML = literatureAverage.toFixed(2);
        tr.appendChild(td31);

        let td32 = document.createElement("td");
        td32.innerHTML = literatureMedian;
        tr.appendChild(td32);

        let td33 = document.createElement("td");
        td33.innerHTML = literature5Count;
        tr.appendChild(td33);

        let td34 = document.createElement("td");
        td34.innerHTML = literature5Percentage.toFixed(2) + '%';
        tr.appendChild(td34);

        let td35 = document.createElement("td");
        td35.innerHTML = literature4Count;
        tr.appendChild(td35);

        let td36 = document.createElement("td");
        td36.innerHTML = literature4Percentage.toFixed(2) + '%';
        tr.appendChild(td36);

        let td37 = document.createElement("td");
        td37.innerHTML = literature3Count;
        tr.appendChild(td37);

        let td38 = document.createElement("td");
        td38.innerHTML = literature3Percentage.toFixed(2) + '%';
        tr.appendChild(td38);

        let td39 = document.createElement("td");
        td39.innerHTML = literature2Count;
        tr.appendChild(td39);

        let td40 = document.createElement("td");
        td40.innerHTML = literature2Percentage.toFixed(2) + '%';
        tr.appendChild(td40);
        table.appendChild(tr);



        let td41 = document.createElement("td");
        td41.innerHTML =musicAverage.toFixed(2);
        tr.appendChild(td41);

        let td42 = document.createElement("td");
        td42.innerHTML = musicMedian;
        tr.appendChild(td42);

        let td43 = document.createElement("td");
        td43.innerHTML = music5Count;
        tr.appendChild(td43);

        let td44 = document.createElement("td");
        td44.innerHTML = music5Percentage.toFixed(2) + '%';
        tr.appendChild(td44);

        let td45 = document.createElement("td");
        td45.innerHTML = music4Count;
        tr.appendChild(td45);

        let td46 = document.createElement("td");
        td46.innerHTML = music4Percentage.toFixed(2) + '%';
        tr.appendChild(td46);

        let td47 = document.createElement("td");
        td47.innerHTML = music3Count;
        tr.appendChild(td47);

        let td48 = document.createElement("td");
        td48.innerHTML = music3Percentage.toFixed(2) + '%';
        tr.appendChild(td48);

        let td49 = document.createElement("td");
        td49.innerHTML = music2Count;
        tr.appendChild(td49);

        let td50 = document.createElement("td");
        td50.innerHTML = music2Percentage.toFixed(2) + '%';
        tr.appendChild(td50);
        table.appendChild(tr);
    }

    let div = document.getElementById("content-4");
    div.innerHTML = '';;
    div.appendChild(table);
}


function drawChart() {
      var data = google.visualization.arrayToDataTable([
          ['Класс - предмет', 'Средняя оценка', 'Медиана', 
        'Учеников с 2', 'Учеников с 3', 'Учеников с 4', 'Учеников с 5',
        '% учеников с 2', '% учеников с 3', '% учеников с 4', '% учеников с 5'],
          ['9a - Информатика', 3.5, 4, 1, 10, 4, 40, 4, 40, 1, 10],
          ['9а - Физика', 3.9, 4, 2, 20, 5, 50, 3, 30, 0, 0],
          ['9а - Математика', 3.7, 4, 2, 20, 3, 30, 5, 50, 0, 0],
          ['9а - Литература', 4.4, 4, 3, 30, 4, 40, 3, 30, 0, 0],
          ['9а - Музыка', 3.50, 3, 1, 10, 3, 30, 6, 60, 0, 0],
          ['9b - Информатика', 4, 5, 5, 50, 1, 10, 3, 30, 1, 10],
          ['9b - Физика', 4.2, 5, 5, 50, 2, 20, 3, 30, 0, 0],
          ['9b - Математика', 4, 5, 5, 50, 1, 10, 3, 30, 1, 10],
          ['9b - Музыка', 4.1, 5, 5, 50, 2, 20, 2, 20, 1, 10],
          ['9с - Информатика', 3.7, 4, 3, 30, 2, 20, 4, 40, 1, 10],
          ['9с - Физика', 3.7, 4, 3, 30, 2, 20, 4, 40, 1, 10],
          ['9с - Математика', 3.7, 4, 3, 30, 2, 20, 4, 40, 1, 10],
          ['9с - Литература', 3.7, 4, 3, 30, 2, 20, 4, 40, 1, 10],
          ['9с - Музыка', 3.7, 4, 3, 30, 2, 20, 4, 40, 1, 10]
        ]);

        var options = {
            width: 1500,
            height: 500,
        chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        chartArea: {
            left: 150,
            top: 50,
            width: '70%',
            height: '60%',
        },
        hAxis: {
            minTextSpacing: 100,
        },
        };


      var chart = new google.visualization.ColumnChart(
        document.getElementById('myChart'));

      chart.draw(data, options);
    }
