/**
 * Created by VaibhavNamburi on 15/01/2016.
 */
var JobPosting = require('./jobPostingModel.js');
var bluebird = require('bluebird');
var util = require('../config/utils.js')

var defaultJobPostingProps = util.defaultJobPostingProperties;
var buildDefaultQuery = util.buildDefaultQuery;

module.exports = {


    createJobPosting : function(req,res,next){
        var data = req.body
        console.log(req.body)
        var jobPosting = {
            jobTitle : data.jobTitle,
            description : data.description,
            company : data.company,
            experience : req.body.experience,
            companyLinkedIn :req.body.companyLinkedIn,
            postedDate : req.body.postedDate
        }

        JobPosting(jobPosting).save()
            .then(function(createdJobPosting){
                if(createdJobPosting){
                    res.status(201).json(defaultJobPostingProps(createdJobPosting));
                }
            })
            .catch(function(err){
                throw err;
            })

    },

    getJobPosting : function(req,res,next){
        var dbQuery = buildDefaultQuery(req);
        var resultLimit = Number(req.query.resultLimit) || 10;

        JobPosting.find(dbQuery)
            .limit(resultLimit)
            .then(function(dbResults){
                res.json(defaultJobPostingProps(dbResults))
            })
            .catch(function(err){
                throw err;
            });
    },

    specificJobPosting : function(req,res,next){

        JobPosting.find({_id : req.params.id})
            .then(function(dbResult){
                res.json(defaultJobPostingProps(dbResult))
            })

    }


}
