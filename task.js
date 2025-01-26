export function task( idTask, desTask, statusTask) {
    let id = idTask ?? 0;
    let description = desTask ?? "";
    let status = statusTask ?? "todo";
    let createdAt = getCurrentTime();
    let updatedAt = "";
    return {
        getId: function(){
            return id;
        },
        setId: function(value) {
            id = value;
            const currentTime = Date.now().toString("yyyy/MM/dd");
            this.setUpdatedAt(currentTime);
        },
        getDescription: function() {
            return description;
        },
        setDescription: function(value) {
            description = value;
            const currentTime = Date.now().toString("yyyy/MM/dd");
            this.setUpdatedAt(currentTime);
        },
        getStatus: function () {
            return status;
        },
        setStatus: function(value) {
            status = value;
            const currentTime = Date.now().toString("yyyy/MM/dd");
            this.setUpdatedAt(currentTime);
        },
        getCreatedAt: function() {
            return createdAt;
        },
        setCreatedAt: function(value) {
            createdAt = value;
            const currentTime = Date.now().toString("yyyy/MM/dd");
            this.setUpdatedAt(currentTime);
        },
        getUpdatedAt: function() {
            return updatedAt;
        },
        setUpdatedAt: function(value) {
            updatedAt = value;
        },
        getInstance: function() {
            return {
                id: id,
                description: description,
                status: status,
                createdAt: createdAt,
                updatedAt: updatedAt
            }
        }
    }
}

function getCurrentTime() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    return `${currentYear}/${currentMonth}/${currentDay} ${currentHour}:${currentMinute}`;
}