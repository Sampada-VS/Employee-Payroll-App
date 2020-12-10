window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
});
const createInnerHtml=() =>{
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHtml=`${headerHtml}
        <tr>
            <td><img class="profile" alt="profileImg" src="../assets/profile-images/Ellipse 1.png"></td>
            <td>Sampada Shivkar</td>
            <td>Female</td>
            <td><div class="dept-label">HR</div>
                <div class="dept-label">Finance</div></td>
            <td>300000</td>
            <td>Thu Dec 03 2020</td>
            <td><img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="1" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
    `;
    document.querySelector('#table-display').innerHTML=innerHtml;
}