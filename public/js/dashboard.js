

let datas = [
  {
    title: 'Issue 1',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, velit!',
    tag: 'In Review',
    date: new Date(2022, 1, 17),
  },
  {
    title: 'Issue 2',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, velit!',
    tag: 'Urgent',
    date: new Date(2022, 1, 18),
  },
  {
    title: 'Issue 3',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, velit!',
    tag: 'Closed',
    date: new Date(2022, 1, 19),
  },
  {
    title: 'Issue 4',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, velit!',
    tag: 'Open',
    date: new Date(2022, 1, 20),
  }
];

let tags_thema = {
  "Open": '<span class="bg-green-200 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Open</span>',
  "Urgent": '<span class="bg-red-200 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Urgent</span>',
  "In Progress": '<span class="bg-yellow-200 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">In Progress</span>',
  "In Review": '<span class="bg-violet-200 text-violet-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">In Review</span>',
  "Resolved": '<span class="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Resolved</span>',
  "Closed": '<span class="bg-stone-200 text-stone-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Closed</span>',
}

const filtering = () => {
  let sort = document.getElementById('sort').value;
  let tag = document.getElementById('search-tag').value;
  let dateStart = new Date(document.getElementById('start').value);
  let dateEnd = new Date(document.getElementById('end').value);
  let displayed_data = datas;
  if (tag !== '') {
    console.log(tag)
    displayed_data = displayed_data.filter((data) => {
      return data.tag.toLowerCase().includes(tag)
    })
  }
  if (dateStart.toString() !== "Invalid Date" && dateEnd.toString() !== "Invalid Date") {
    displayed_data = displayed_data.filter((data) => {
      return (data.date >= dateStart) && (data.date <= dateEnd)
    })
  }
  if (sort == '1') {
    displayed_data.sort((a, b) => b.date - a.date);
  } else if (sort == '0') {
    displayed_data.sort((a, b) => a.date - b.date);
  }
  display_data(displayed_data)
}

const display_data = (items) => {
  let content = document.getElementById('data_content');
  let modal = document.getElementById('modal');
  let i = 0;
  content.innerHTML = '';
  modal.innerHTML = '';
  for (const item of items) {
    content.innerHTML += `
    <tr class="hover:bg-gray-100">
      <td class="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">${item.title}
      </td>
      <td class="py-3 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
        <button type="button" class="text-white text-sm bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2" data-modal-toggle="desc-modal-${i}">Read More</button>
      </td>
      <td class="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-center">
        ${tags_thema[item.tag]}
      </td>
      <td class="py-3 px-6 text-sm font-medium text-right whitespace-nowrap flex justify-center">
        <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
            </path>
          </svg>
        </button>
        <button type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2" data-modal-toggle="edit-modal-${i}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
            </path>
          </svg>
        </button>
      </td>
    </tr>
    `

    modal.innerHTML += `
      <div id="edit-modal-${i}" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
        <div class="relative px-4 w-full max-w-3xl h-full md:h-auto">
          <!-- Modal content -->
          <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
            <form class="space-y-4" action="/issue">
              <div class="div">
                <h3 class="text-xl font-bold text-primary">Form</h3>
                <p class="text-sm text-primary">Isi yang ada dibawah ini</p>
              </div>
              <div>
                <label for="title" class="block mb-2 text-sm font-bold text-primary">Judul</label>
                <input type="text" name="title" id="title"
                  class="font-medium bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan judul" value="${item.title}" required>
              </div>
              <div>
                <label for="description" class="block mb-2 text-sm font-bold text-primary">Deskripsi</label>
                <textarea type="text" name="description" id="deskripsi"
                  class="font-medium bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan deskripsi" required>${item.description}</textarea>
              </div>
              <div>
                <label for="tag" class="block mb-2 text-sm font-bold text-primary">Tag</label>
                <input type="text" name="tag" id="tag"
                  class="font-medium bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan tag" value="${item.tag}" required>
              </div>
              <div class="flex justify-center items-center">
                <button type="submit"
                  class="w-4/12 mt-3 text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  data-modal-toggle="edit-modal-${i}">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="desc-modal-${i}" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
        <div class="relative px-4 w-full max-w-3xl h-full md:h-auto">
          <!-- Modal content -->
          <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 ">
              <div class="div">
                <h3 class="text-xl font-bold text-primary">Deskripsi >> Read More</h3>
                <p class="text-sm text-primary">Penjelasan deskripsi</p>
              </div>
              <div>
                <textarea type="text" name="description" id="deskripsi"
                  class="font-medium bg-primary border text-white border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Masukkan deskripsi" rows="4" required disabled readonly>${item.description}</textarea>
              </div>
              <div class="flex justify-center items-center">
                <button
                  class="w-4/12 mt-3 text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  data-modal-toggle="desc-modal-${i}">Back</button>
              </div>
          </div>
        </div>
      </div>
    `
    i++;
  }
}

filtering();
